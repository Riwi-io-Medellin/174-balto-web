import { NextRequest } from "next/server";
import { proxyBackendJson } from "../../../../_lib/backend-json";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> },
) {
  const { alertId } = await params;

  return proxyBackendJson(
    request,
    `/admin/operations/alerts/${alertId}/moderation`,
    {
      method: "PATCH",
      body: await request.text(),
    },
  );
}
