"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  ShieldCheck,
  UserCheck,
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
        <ShieldCheck className="h-5 w-5 text-[#9dd0d0]" />
        <h3 className="mt-4 text-lg font-semibold text-white">
          Revision manual de servicios
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
          Aprueba o rechaza veterinarias y walkers a partir de sus documentos.
          Un registro aprobado queda activo para los flujos que dependen de
          `verification_status = approved`.
        </p>
      </div>

      <VerificationSummary businesses={businesses} walkers={walkers} />

      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-center gap-3">
          <Building2 className="h-5 w-5 text-[#9dd0d0]" />
          <div>
            <h3 className="text-lg font-semibold text-white">Veterinarias</h3>
            <p className="text-sm text-zinc-400">
              Revisa documentos cargados por negocios y cambia su estado.
            </p>
          </div>
        </div>
        <BusinessVerificationTable
          businesses={businesses}
          pendingId={businessMutation.variables?.businessId}
          isPending={businessMutation.isPending}
          onStatusChange={(businessId, status) =>
            businessMutation.mutate({ businessId, status })
          }
        />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-center gap-3">
          <UserCheck className="h-5 w-5 text-[#9dd0d0]" />
          <div>
            <h3 className="text-lg font-semibold text-white">Walkers</h3>
            <p className="text-sm text-zinc-400">
              Revisa cedulas y documentos KYC para habilitar o deshabilitar.
            </p>
          </div>
        </div>
        <WalkerVerificationTable
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
      <SummaryCard label="Veterinarias" value={businesses.length} />
      <SummaryCard label="Veterinarias pendientes" value={pendingBusinesses} />
      <SummaryCard label="Walkers" value={walkers.length} />
      <SummaryCard label="Walkers pendientes" value={pendingWalkers} />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/5 p-5">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </article>
  );
}

function BusinessVerificationTable({
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
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Veterinaria</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Documentos</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {businesses.map((business) => (
            <tr key={business.id} className="text-zinc-200">
              <td className="px-4 py-4">
                <p className="font-medium text-white">{business.name}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  NIT {business.nit} · {business.email}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {business.location ?? "Sin ubicacion"} · {business.type ?? "Sin tipo"}
                </p>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={business.verificationStatus} />
              </td>
              <td className="px-4 py-4">
                <DocumentLinks documents={business.documents} />
              </td>
              <td className="px-4 py-4">
                <StatusActions
                  currentStatus={business.verificationStatus}
                  disabled={isPending && pendingId === business.id}
                  onChange={(status) => onStatusChange(business.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WalkerVerificationTable({
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
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Walker</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">KYC</th>
            <th className="px-4 py-3 font-medium">Documentos</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {walkers.map((walker) => (
            <tr key={walker.id} className="text-zinc-200">
              <td className="px-4 py-4">
                <p className="font-medium text-white">{walker.fullName}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {walker.workLocation ?? "Sin zona"} ·{" "}
                  {walker.isAcceptingBookings ? "Acepta reservas" : "No acepta reservas"}
                </p>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={walker.verificationStatus} />
              </td>
              <td className="px-4 py-4">
                <p className="text-sm text-zinc-200">
                  {walker.documentName ?? "Nombre no extraido"}
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {walker.documentNumber ?? "Documento no extraido"}
                </p>
              </td>
              <td className="px-4 py-4">
                <DocumentLinks documents={walker.documents} />
              </td>
              <td className="px-4 py-4">
                <StatusActions
                  currentStatus={walker.verificationStatus}
                  disabled={isPending && pendingId === walker.id}
                  onChange={(status) => onStatusChange(walker.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
