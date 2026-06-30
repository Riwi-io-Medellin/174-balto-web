import { NextRequest } from "next/server";
import { proxyBackendJson } from "../../../../_lib/backend-json";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  return proxyBackendJson(request, `/admin/operations/users/${userId}/action`, {
    method: "PATCH",
    body: await request.text(),
  });
}
