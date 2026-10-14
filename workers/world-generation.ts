import { Worker } from "bullmq";
import IORedis from "ioredis";
if(!process.env.REDIS_URL)throw new Error("REDIS_URL is required for the generation worker");
const connection=new IORedis(process.env.REDIS_URL,{maxRetriesPerRequest:null});
new Worker("world-generation",async job=>{const response=await fetch(`${process.env.APP_INTERNAL_URL}/api/worlds/generate`,{method:"POST",headers:{"content-type":"application/json","x-worker-secret":process.env.WORKER_SECRET||""},body:JSON.stringify(job.data)});if(!response.ok)throw new Error(`Generation API failed: ${response.status}`);return response.json()},{connection,concurrency:Number(process.env.WORKER_CONCURRENCY||2)});
