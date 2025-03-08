import { generateSoduku } from "@/lib/utils";
import { liveblocks } from "../../../../liveblocks.server.config";
import {LiveList, LiveObject, PlainLsonObject, toPlainLson} from "@liveblocks/client"


export async function POST(req: Request){
    const body = await req.text();
    if(!body) Response.error();

    const {id, difficulty} = JSON.parse(body);
    const game = new LiveObject({
        time: 0,
        isRunning: true,
    isSolved: false,
    sudoku: generateSoduku(difficulty),
    mistakeCount: 0,
    validateMode: true,
    undoHistory: new LiveList<LiveObject<HistoryStack>>([]),
    redoHistory: new LiveList<LiveObject<HistoryStack>>([]),
    confettiOptions: new LiveObject({ x: null, y: null })
    })

    const root = toPlainLson(game) as PlainLsonObject;
    try{
        await liveblocks.initializeStorageDocument(id, root);
        return new Response("Success", {status: 200});
    }catch(error){
        return new Response(`Error: ${error}`, {status: 500});
    }
}