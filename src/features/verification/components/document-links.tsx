import { ExternalLink, FileText } from "lucide-react";
import type { VerificationDocument } from "../types";

export function DocumentLinks({
  documents,
}: {
  documents: VerificationDocument[];
}) {
  if (documents.length === 0) {
    return <span className="text-sm text-zinc-500">Sin documentos</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((document) => (
        <a
          key={document.id}
          href={document.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#9dd0d0] transition hover:text-white"
        >
          <FileText className="h-4 w-4" />
          {document.documentType}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
