"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";
import { ApiError } from "@/features/users/api";
import {
  listBusinessVerifications,
  listWalkerVerifications,
  updateBusinessVerificationStatus,
  updateWalkerVerificationStatus,
} from "../api";
import type {
  BusinessVerification,
  VerificationStatus,
  WalkerVerification,
} from "../types";
import { DocumentLinks } from "./document-links";
import { StatusActions } from "./status-actions";
import { StatusBadge } from "./status-badge";

export function VerificationPanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const businessesQuery = useQuery({
    queryKey: ["admin", "verification", "businesses"],
    queryFn: listBusinessVerifications,
  });
  const walkersQuery = useQuery({
    queryKey: ["admin", "verification", "walkers"],
    queryFn: listWalkerVerifications,
  });

  useEffect(() => {
    const error = businessesQuery.error ?? walkersQuery.error;

    if (error instanceof ApiError && error.code === "SESSION_EXPIRED") {
      router.replace("/login?next=/dashboard");
    }
  }, [businessesQuery.error, router, walkersQuery.error]);

  const businessMutation = useMutation({
    mutationFn: ({
      businessId,
      status,
    }: {
      businessId: string;
      status: VerificationStatus;
    }) => updateBusinessVerificationStatus(businessId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "verification", "businesses"],
      });
    },
  });

  const walkerMutation = useMutation({
    mutationFn: ({
      walkerId,
      status,
    }: {
      walkerId: string;
      status: VerificationStatus;
    }) => updateWalkerVerificationStatus(walkerId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "verification", "walkers"],
      });
    },
  });

  const businesses = businessesQuery.data ?? [];
  const walkers = walkersQuery.data ?? [];

  if (businessesQuery.isPending || walkersQuery.isPending) {
    return <VerificationLoading />;
  }

  if (businessesQuery.isError || walkersQuery.isError) {
    const error = businessesQuery.error ?? walkersQuery.error;
    return (
      <section className="rounded-lg border border-red-400/20 bg-red-400/10 p-6">
        <h2 className="text-lg font-semibold text-red-100">
          No fue posible cargar las verificaciones
        </h2>
        <p className="mt-2 text-sm text-red-100/80">
          {error instanceof Error ? error.message : "Intenta nuevamente."}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <ShieldCheck className="h-5 w-5 text-[#9dd0d0]" />
            <h3 className="mt-4 text-lg font-semibold text-white">
              Revision manual de servicios
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Revisa el estado actual, abre los documentos cargados y decide si
              una veterinaria o walker queda aprobado o rechazado.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-3">
            <p className="text-xs uppercase text-zinc-500">Regla operativa</p>
            <p className="mt-1 text-sm font-medium text-white">
              Solo `approved` queda activo en la app
            </p>
          </div>
        </div>
      </div>

      <VerificationSummary businesses={businesses} walkers={walkers} />

      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-[#9dd0d0]" />
          <div>
            <h3 className="text-lg font-semibold text-white">Veterinarias</h3>
            <p className="text-sm text-zinc-400">
              Documentos legales y datos de contacto del negocio.
            </p>
          </div>
          </div>
          <StatusLegend />
        </div>
        <BusinessVerificationList
          businesses={businesses}
          pendingId={businessMutation.variables?.businessId}
          isPending={businessMutation.isPending}
          onStatusChange={(businessId, status) =>
            businessMutation.mutate({ businessId, status })
          }
        />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <UserCheck className="h-5 w-5 text-[#9dd0d0]" />
          <div>
            <h3 className="text-lg font-semibold text-white">Walkers</h3>
            <p className="text-sm text-zinc-400">
              Cedula, resultado KYC y documentos para revision manual.
            </p>
          </div>
          </div>
          <StatusLegend />
        </div>
        <WalkerVerificationList
          walkers={walkers}
          pendingId={walkerMutation.variables?.walkerId}
          isPending={walkerMutation.isPending}
          onStatusChange={(walkerId, status) =>
            walkerMutation.mutate({ walkerId, status })
          }
        />
      </section>
    </section>
  );
}

function VerificationSummary({
  businesses,
  walkers,
}: {
  businesses: BusinessVerification[];
  walkers: WalkerVerification[];
}) {
  const pendingBusinesses = businesses.filter(
    (business) => business.verificationStatus === "pending",
  ).length;
  const pendingWalkers = walkers.filter(
    (walker) => walker.verificationStatus === "pending",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard icon={Building2} label="Veterinarias" value={businesses.length} />
      <SummaryCard icon={Clock3} label="Veterinarias pendientes" value={pendingBusinesses} />
      <SummaryCard icon={UserCheck} label="Walkers" value={walkers.length} />
      <SummaryCard icon={Clock3} label="Walkers pendientes" value={pendingWalkers} />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/5 p-5">
      <Icon className="h-5 w-5 text-[#9dd0d0]" />
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </article>
  );
}

function BusinessVerificationList({
  businesses,
  pendingId,
  isPending,
  onStatusChange,
}: {
  businesses: BusinessVerification[];
  pendingId?: string;
  isPending: boolean;
  onStatusChange: (businessId: string, status: VerificationStatus) => void;
}) {
  if (businesses.length === 0) {
    return <p className="text-sm text-zinc-400">No hay veterinarias registradas.</p>;
  }

  return (
    <div className="grid gap-4">
      {businesses.map((business) => (
        <ReviewCard
          key={business.id}
          title={business.name}
          subtitle={`NIT ${business.nit} · ${business.email}`}
          status={business.verificationStatus}
          details={[
            { label: "Tipo", value: business.type ?? "Sin tipo" },
            { label: "Ubicacion", value: business.location ?? "Sin ubicacion" },
            { label: "Telefono", value: String(business.phone) },
          ]}
          documents={business.documents}
          disabled={isPending && pendingId === business.id}
          onStatusChange={(status) => onStatusChange(business.id, status)}
        />
      ))}
    </div>
  );
}

function WalkerVerificationList({
  walkers,
  pendingId,
  isPending,
  onStatusChange,
}: {
  walkers: WalkerVerification[];
  pendingId?: string;
  isPending: boolean;
  onStatusChange: (walkerId: string, status: VerificationStatus) => void;
}) {
  if (walkers.length === 0) {
    return <p className="text-sm text-zinc-400">No hay walkers registrados.</p>;
  }

  return (
    <div className="grid gap-4">
      {walkers.map((walker) => (
        <ReviewCard
          key={walker.id}
          title={walker.fullName}
          subtitle={`${walker.workLocation ?? "Sin zona"} · ${
            walker.isAcceptingBookings ? "Acepta reservas" : "No acepta reservas"
          }`}
          status={walker.verificationStatus}
          details={[
            { label: "Nombre KYC", value: walker.documentName ?? "No extraido" },
            { label: "Documento", value: walker.documentNumber ?? "No extraido" },
            { label: "Experiencia", value: walker.experience ?? "Sin registro" },
          ]}
          documents={walker.documents}
          disabled={isPending && pendingId === walker.id}
          onStatusChange={(status) => onStatusChange(walker.id, status)}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  title,
  subtitle,
  status,
  details,
  documents,
  disabled,
  onStatusChange,
}: {
  title: string;
  subtitle: string;
  status: VerificationStatus;
  details: Array<{ label: string; value: string }>;
  documents: Array<{ id: string; documentType: string; fileUrl: string; createdAt: string }>;
  disabled: boolean;
  onStatusChange: (status: VerificationStatus) => void;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-zinc-950/35 p-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="truncate text-base font-semibold text-white">{title}</h4>
              <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="text-xs uppercase text-zinc-500">Estado actual</span>
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs uppercase text-zinc-500">{detail.label}</p>
                <p className="mt-1 truncate text-sm font-medium text-zinc-200">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusActions
              currentStatus={status}
              disabled={disabled}
              onChange={onStatusChange}
            />
            {disabled ? (
              <span className="text-xs text-zinc-500">Actualizando estado...</span>
            ) : null}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-[#9dd0d0]" />
              <p className="text-sm font-semibold text-white">Documentos</p>
            </div>
            <span className="text-xs text-zinc-500">{documents.length}</span>
          </div>
          <DocumentLinks documents={documents} />
        </div>
      </div>
    </article>
  );
}

function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5 text-amber-200" />
        Pendiente
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-200" />
        Aprobado
      </span>
      <span className="inline-flex items-center gap-1.5">
        <XCircle className="h-3.5 w-3.5 text-red-200" />
        Rechazado
      </span>
    </div>
  );
}

function VerificationLoading() {
  return (
    <section className="space-y-6">
      <div className="h-36 animate-pulse rounded-lg bg-white/5" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-lg bg-white/5" />
      <div className="h-80 animate-pulse rounded-lg bg-white/5" />
    </section>
  );
}
