import { NextRequest } from "next/server";
import { proxyBackendJson } from "../../_lib/backend-json";

export async function GET(request: NextRequest) {
  return proxyBackendJson(request, "/admin/operations/alerts");
}
