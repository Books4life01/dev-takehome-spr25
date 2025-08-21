import { NextRequest, NextResponse } from "next/server";
import ItemRequestModel,{ItemRequest} from "@/app/models/request";
import connectDB from "@/lib/db";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { ObjectId } from "mongodb";

/* eslint-disable @typescript-eslint/no-explicit-any */


export async function GET(request: NextRequest) {
    await connectDB();
    //Get Page Param from url with a default of 1
    const pageParam = request.nextUrl.searchParams.get("page");
    const page: number = pageParam ? parseInt(pageParam, 10) : -1;

    //construct initial aggregation pipeline to sort by date created, and paginate based off of PAGINATION PAGE SIZE
    const pipeline:any = (page!=-1?[{$sort:{createdDate:-1}},{$skip:(page-1)*PAGINATION_PAGE_SIZE},{$limit:PAGINATION_PAGE_SIZE}]:[{$sort:{createdDate:-1}}]);

    //if a status queryis provided, add a filter for that status to the pipeline
    const statusSelected:any = request.nextUrl.searchParams.get("status");
    if(statusSelected && statusSelected!="all"){
        (pipeline).unshift({$match:{status:statusSelected}})
    }

    return NextResponse.json((await ItemRequestModel.aggregate(pipeline)))
}

export async function PUT(request: NextRequest) {
    await connectDB();
    let body: Partial<ItemRequest>|Partial<ItemRequest>[] = await request.json();
    console.log(body);

    body = Array.isArray(body) ? body : [body];

    const items = body.map(item=>({id:item.id??new ObjectId().toString(),...item,createdDate:new Date(),lastEditedDate:new Date(),status:"pending"}));
    await ItemRequestModel.insertMany(items);

    return NextResponse.json({message:"success"})
}

export async function PATCH(request: NextRequest) {
    await connectDB();
    //retreieve body
    let body: Partial<ItemRequest>|Partial<ItemRequest>[] = await request.json();
    console.log(body)
    body = Array.isArray(body) ? body : [body];

    const updates = body.map(
        (item)=>({
            updateOne:{
                filter:{id:item.id},
                update:{$set:{...item,lastEditedDate:new Date()}}
            }
        }))

    const res = await ItemRequestModel.bulkWrite(updates);
   
   return NextResponse.json({message: res.modifiedCount+" / " +body.length+" items updated"})

}


export async function DELETE(request : NextRequest) {
    await connectDB();
    //retrieve body and ensure its an array
    let body = await request.json();
    body = Array.isArray(body) ? body : [body];

//delete all ids in list
 await ItemRequestModel.deleteMany({id:{$in:body}});
    return NextResponse.json({message:"sucess"})

    
}
