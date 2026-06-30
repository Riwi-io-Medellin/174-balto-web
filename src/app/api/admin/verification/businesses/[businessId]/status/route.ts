import { NextRequest } from "next/server";
import { proxyBackendJson } from "../../../../_lib/backend-json";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ businessId: string }> },
) {
  const { businessId } = await params;

  return proxyBackendJson(
    request,
    `/admin/verification/businesses/${businessId}/status`,
    {
      method: "PATCH",
      body: await request.text(),
    },
  );
}
