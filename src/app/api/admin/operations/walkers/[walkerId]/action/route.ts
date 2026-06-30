import { NextRequest } from "next/server";
import { proxyBackendJson } from "../../../../_lib/backend-json";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ walkerId: string }> },
) {
  const { walkerId } = await params;

  return proxyBackendJson(request, `/admin/operations/walkers/${walkerId}/action`, {
    method: "PATCH",
    body: await request.text(),
  });
}
