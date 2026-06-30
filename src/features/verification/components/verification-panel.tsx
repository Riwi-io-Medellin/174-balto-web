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
import { useLanguage } from "@/features/i18n";
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
  const { t } = useLanguage();
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
    return (
      <section className="rounded-[1.7rem] border border-[#fecaca] bg-[#fff1f2] p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#b91c1c]">
          {t("verification.loadErrorTitle")}
        </h2>
        <p className="mt-2 text-sm font-semibold text-[#b91c1c]/80">
          {t("dashboard.genericRetry")}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#6d7cff]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-black text-[#16215c]">
              {t("verification.title")}
            </h3>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#687280]">
              {t("verification.description")}
            </p>
          </div>
          <div className="rounded-2xl border border-[#68d391]/45 bg-[#eafbf0] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#2f8a5b]">
              {t("verification.ruleLabel")}
            </p>
            <p className="mt-1 text-sm font-black text-[#153f2a]">
              {t("verification.ruleText")}
            </p>
          </div>
        </div>
      </div>

      <VerificationSummary businesses={businesses} walkers={walkers} />

      <section className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fcf8ee] text-[#8d5b13]">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-[#16215c]">
                {t("verification.businesses")}
              </h3>
              <p className="text-sm font-semibold text-[#687280]">
                {t("verification.businessesDescription")}
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

      <section className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eafbf0] text-[#2f8a5b]">
              <UserCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-[#16215c]">
                {t("verification.walkers")}
              </h3>
              <p className="text-sm font-semibold text-[#687280]">
                {t("verification.walkersDescription")}
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
  const { t } = useLanguage();
  const pendingBusinesses = businesses.filter(
    (business) => business.verificationStatus === "pending",
  ).length;
  const pendingWalkers = walkers.filter(
    (walker) => walker.verificationStatus === "pending",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        icon={Building2}
        label={t("verification.businesses")}
        value={businesses.length}
        tone="sand"
      />
      <SummaryCard
        icon={Clock3}
        label={t("verification.pendingBusinesses")}
        value={pendingBusinesses}
        tone="amber"
      />
      <SummaryCard
        icon={UserCheck}
        label={t("verification.walkers")}
        value={walkers.length}
        tone="green"
      />
      <SummaryCard
        icon={Clock3}
        label={t("verification.pendingWalkers")}
        value={pendingWalkers}
        tone="blue"
      />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Building2;
  label: string;
  value: number;
  tone: "sand" | "amber" | "green" | "blue";
}) {
  const tones = {
    sand: "bg-[#fcf8ee] text-[#8d5b13]",
    amber: "bg-[#fff7e6] text-[#b56e00]",
    green: "bg-[#eafbf0] text-[#2f8a5b]",
    blue: "bg-[#eef1ff] text-[#6d7cff]",
  };

  return (
    <article className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#16215c]/6">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-2xl font-black text-[#16215c]">{value}</p>
      <p className="mt-1 text-sm font-semibold text-[#687280]">{label}</p>
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
  const { t } = useLanguage();

  if (businesses.length === 0) {
    return (
      <p className="rounded-2xl bg-[#f4f6fb] p-4 text-sm font-semibold text-[#687280]">
        {t("verification.noBusinesses")}
      </p>
    );
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
            {
              label: t("verification.businessType"),
              value: business.type ?? t("verification.noBusinessType"),
            },
            {
              label: t("verification.location"),
              value: business.location ?? t("verification.noLocation"),
            },
            { label: t("verification.phone"), value: String(business.phone) },
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
  const { t } = useLanguage();

  if (walkers.length === 0) {
    return (
      <p className="rounded-2xl bg-[#f4f6fb] p-4 text-sm font-semibold text-[#687280]">
        {t("verification.noWalkers")}
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {walkers.map((walker) => (
        <ReviewCard
          key={walker.id}
          title={walker.fullName}
          subtitle={`${walker.workLocation ?? t("verification.noZone")} · ${
            walker.isAcceptingBookings
              ? t("verification.acceptsBookings")
              : t("verification.noBookings")
          }`}
          status={walker.verificationStatus}
          details={[
            {
              label: t("verification.kycName"),
              value: walker.documentName ?? t("verification.noExtracted"),
            },
            {
              label: t("verification.document"),
              value: walker.documentNumber ?? t("verification.noExtracted"),
            },
            {
              label: t("verification.experience"),
              value: walker.experience ?? t("verification.noExperience"),
            },
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
  const { t } = useLanguage();

  return (
    <article className="rounded-[1.5rem] border border-[#e5e7eb] bg-[#fbfcff] p-5 transition hover:border-[#6d7cff]/25 hover:bg-white hover:shadow-lg hover:shadow-[#16215c]/6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="truncate text-base font-black text-[#16215c]">{title}</h4>
              <p className="mt-1 text-sm font-semibold text-[#687280]">{subtitle}</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#8b95a4]">
                {t("verification.currentStatus")}
              </span>
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-2xl border border-[#e5e7eb] bg-white p-3">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#8b95a4]">{detail.label}</p>
                <p className="mt-1 truncate text-sm font-black text-[#16215c]">{detail.value}</p>
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
              <span className="text-xs font-semibold text-[#687280]">
                {t("verification.updatingStatus")}
              </span>
            ) : null}
          </div>
        </div>

        <div className="rounded-[1.3rem] border border-[#e5e7eb] bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-[#6d7cff]" />
              <p className="text-sm font-black text-[#16215c]">
                {t("verification.documents")}
              </p>
            </div>
            <span className="rounded-full bg-[#eef1ff] px-2 py-1 text-xs font-black text-[#6d7cff]">{documents.length}</span>
          </div>
          <DocumentLinks documents={documents} />
        </div>
      </div>
    </article>
  );
}

function StatusLegend() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[#687280]">
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5 text-[#b56e00]" />
        {t("verification.pending")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#2f8a5b]" />
        {t("verification.approved")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <XCircle className="h-3.5 w-3.5 text-[#b91c1c]" />
        {t("verification.rejected")}
      </span>
    </div>
  );
}

function VerificationLoading() {
  return (
    <section className="space-y-6">
      <div className="h-36 animate-pulse rounded-[1.7rem] bg-white" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-[1.5rem] bg-white" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-[1.7rem] bg-white" />
      <div className="h-80 animate-pulse rounded-[1.7rem] bg-white" />
    </section>
  );
}
