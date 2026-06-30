"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ClipboardList,
  Eye,
  FileText,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserRound,
  Users2,
} from "lucide-react";
import { useLanguage } from "@/features/i18n";
import {
  listAdminAlerts,
  listAdminAuditLogs,
  listAdminUsers,
  listAdminWalkers,
  moderateAdminAlert,
  updateAdminUser,
  updateAdminWalker,
} from "../api";
import type {
  AdminAuditLog,
  AdminCommunityAlert,
  AdminFilters,
  AdminUser,
  AdminWalker,
  AlertStatus,
  EntityAction,
  RiskLevel,
} from "../types";

type OperationsTab = "users" | "walkers" | "alerts" | "audit";
type Selection =
  | { type: "user"; item: AdminUser }
  | { type: "walker"; item: AdminWalker }
  | { type: "alert"; item: AdminCommunityAlert }
  | { type: "audit"; item: AdminAuditLog };
type PendingAction =
  | { target: "user"; item: AdminUser; action: EntityAction }
  | { target: "walker"; item: AdminWalker; action: EntityAction }
  | { target: "alert"; item: AdminCommunityAlert; status: AlertStatus };

const defaultFilters: AdminFilters = {
  search: "",
  status: "",
  role: "",
  alertType: "",
  verificationStatus: "",
  from: "",
  to: "",
};

export function AdminOperationsPanel() {
  const { language } = useLanguage();
  const copy = useMemo(() => getCopy(language), [language]);
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<OperationsTab>("users");
  const [filters, setFilters] = useState(defaultFilters);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const usersQuery = useQuery({
    queryKey: ["admin", "operations", "users", filters],
    queryFn: () => listAdminUsers(filters),
  });
  const walkersQuery = useQuery({
    queryKey: ["admin", "operations", "walkers", filters],
    queryFn: () => listAdminWalkers(filters),
  });
  const alertsQuery = useQuery({
    queryKey: ["admin", "operations", "alerts", filters],
    queryFn: () => listAdminAlerts(filters),
  });
  const auditQuery = useQuery({
    queryKey: ["admin", "operations", "audit"],
    queryFn: listAdminAuditLogs,
  });

  const actionMutation = useMutation({
    mutationFn: async ({
      action,
      reason,
      confirmImpact,
    }: {
      action: PendingAction;
      reason: string;
      confirmImpact: boolean;
    }) => {
      if (action.target === "user") {
        return updateAdminUser(action.item.id, action.action, reason, confirmImpact);
      }

      if (action.target === "walker") {
        return updateAdminWalker(action.item.id, action.action, reason, confirmImpact);
      }

      return moderateAdminAlert(
        action.item.id,
        action.status,
        reason,
        action.item.updatedAt,
        confirmImpact,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "operations"] });
      setPendingAction(null);
    },
  });

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-sm">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#eef1ff] blur-3xl" />
        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6d7cff]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#16215c]">{copy.title}</h2>
          <p className="mt-4 max-w-3xl text-[#526071]">{copy.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-white bg-white p-2 shadow-sm">
        <TabButton active={tab === "users"} icon={Users2} label={copy.users} onClick={() => setTab("users")} />
        <TabButton active={tab === "walkers"} icon={UserRound} label={copy.walkers} onClick={() => setTab("walkers")} />
        <TabButton active={tab === "alerts"} icon={ShieldAlert} label={copy.alerts} onClick={() => setTab("alerts")} />
        <TabButton active={tab === "audit"} icon={ClipboardList} label={copy.audit} onClick={() => setTab("audit")} />
      </div>

      {tab !== "audit" ? (
        <FiltersBar
          tab={tab}
          filters={filters}
          setFilters={setFilters}
          copy={copy}
        />
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          {tab === "users" ? (
            <UsersOperationsTable
              users={usersQuery.data ?? []}
              isLoading={usersQuery.isPending}
              copy={copy}
              onSelect={(item) => setSelection({ type: "user", item })}
              onAction={(item, action) => setPendingAction({ target: "user", item, action })}
            />
          ) : null}

          {tab === "walkers" ? (
            <WalkersOperationsTable
              walkers={walkersQuery.data ?? []}
              isLoading={walkersQuery.isPending}
              copy={copy}
              onSelect={(item) => setSelection({ type: "walker", item })}
              onAction={(item, action) => setPendingAction({ target: "walker", item, action })}
            />
          ) : null}

          {tab === "alerts" ? (
            <AlertsOperationsTable
              alerts={alertsQuery.data ?? []}
              isLoading={alertsQuery.isPending}
              copy={copy}
              onSelect={(item) => setSelection({ type: "alert", item })}
              onModerate={(item, status) => setPendingAction({ target: "alert", item, status })}
            />
          ) : null}

          {tab === "audit" ? (
            <AuditTable
              logs={auditQuery.data ?? []}
              isLoading={auditQuery.isPending}
              copy={copy}
              onSelect={(item) => setSelection({ type: "audit", item })}
            />
          ) : null}
        </div>

        <DetailPanel selection={selection} copy={copy} />
      </div>

      {pendingAction ? (
        <ActionModal
          action={pendingAction}
          copy={copy}
          isPending={actionMutation.isPending}
          error={actionMutation.error instanceof Error ? actionMutation.error.message : null}
          onClose={() => setPendingAction(null)}
          onSubmit={(reason, confirmImpact) =>
            actionMutation.mutate({ action: pendingAction, reason, confirmImpact })
          }
        />
      ) : null}
    </section>
  );
}

function FiltersBar({
  tab,
  filters,
  setFilters,
  copy,
}: {
  tab: OperationsTab;
  filters: AdminFilters;
  setFilters: (filters: AdminFilters) => void;
  copy: ReturnType<typeof getCopy>;
}) {
  const update = (key: keyof AdminFilters, value: string) =>
    setFilters({ ...filters, [key]: value });

  return (
    <section className="rounded-[1.7rem] border border-white bg-white p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_160px_160px_160px_160px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b95a4]" />
          <input
            value={filters.search}
            onChange={(event) => update("search", event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="h-11 w-full rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] pl-10 pr-3 text-sm font-semibold text-[#16215c] outline-none focus:border-[#6d7cff]"
          />
        </label>

        <Select
          value={filters.status}
          onChange={(value) => update("status", value)}
          options={tab === "alerts" ? copy.alertStatusOptions : copy.accountStatusOptions}
        />
        {tab === "users" ? (
          <Select value={filters.role} onChange={(value) => update("role", value)} options={copy.roleOptions} />
        ) : null}
        {tab === "walkers" ? (
          <Select value={filters.verificationStatus} onChange={(value) => update("verificationStatus", value)} options={copy.verificationOptions} />
        ) : null}
        {tab === "alerts" ? (
          <Select value={filters.alertType} onChange={(value) => update("alertType", value)} options={copy.alertTypeOptions} />
        ) : null}
        <input
          type="date"
          value={filters.from}
          onChange={(event) => update("from", event.target.value)}
          className="h-11 rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] px-3 text-sm font-semibold text-[#16215c] outline-none focus:border-[#6d7cff]"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(event) => update("to", event.target.value)}
          className="h-11 rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] px-3 text-sm font-semibold text-[#16215c] outline-none focus:border-[#6d7cff]"
        />
      </div>
    </section>
  );
}

function UsersOperationsTable({
  users,
  isLoading,
  copy,
  onSelect,
  onAction,
}: {
  users: AdminUser[];
  isLoading: boolean;
  copy: ReturnType<typeof getCopy>;
  onSelect: (item: AdminUser) => void;
  onAction: (item: AdminUser, action: EntityAction) => void;
}) {
  return (
    <TableShell isLoading={isLoading} empty={users.length === 0} copy={copy}>
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.08em] text-[#687280]">
          <tr>
            <th className="px-4 py-3 font-black">{copy.user}</th>
            <th className="px-4 py-3 font-black">{copy.role}</th>
            <th className="px-4 py-3 font-black">{copy.status}</th>
            <th className="px-4 py-3 font-black">{copy.risk}</th>
            <th className="px-4 py-3 font-black">{copy.registered}</th>
            <th className="px-4 py-3 font-black">{copy.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f6]">
          {users.map((user) => (
            <tr key={user.id} className="text-[#526071] hover:bg-[#fbfcff]">
              <td className="px-4 py-4">
                <button type="button" onClick={() => onSelect(user)} className="text-left">
                  <p className="font-black text-[#16215c]">{user.fullName}</p>
                  <p className="mt-1 text-xs font-semibold text-[#687280]">{user.email}</p>
                </button>
              </td>
              <td className="px-4 py-4"><Badge label={copy.labels[user.role] ?? user.role} tone="blue" /></td>
              <td className="px-4 py-4"><StatusBadge status={user.status} copy={copy} /></td>
              <td className="px-4 py-4"><RiskBadge risk={user.riskLevel} copy={copy} /></td>
              <td className="px-4 py-4">{formatDate(user.createdAt)}</td>
              <td className="px-4 py-4"><ActionButtons status={user.status} copy={copy} onAction={(action) => onAction(user, action)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function WalkersOperationsTable({
  walkers,
  isLoading,
  copy,
  onSelect,
  onAction,
}: {
  walkers: AdminWalker[];
  isLoading: boolean;
  copy: ReturnType<typeof getCopy>;
  onSelect: (item: AdminWalker) => void;
  onAction: (item: AdminWalker, action: EntityAction) => void;
}) {
  return (
    <TableShell isLoading={isLoading} empty={walkers.length === 0} copy={copy}>
      <table className="w-full min-w-[940px] text-left text-sm">
        <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.08em] text-[#687280]">
          <tr>
            <th className="px-4 py-3 font-black">{copy.walker}</th>
            <th className="px-4 py-3 font-black">{copy.verification}</th>
            <th className="px-4 py-3 font-black">{copy.status}</th>
            <th className="px-4 py-3 font-black">{copy.bookings}</th>
            <th className="px-4 py-3 font-black">{copy.risk}</th>
            <th className="px-4 py-3 font-black">{copy.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f6]">
          {walkers.map((walker) => (
            <tr key={walker.id} className="text-[#526071] hover:bg-[#fbfcff]">
              <td className="px-4 py-4">
                <button type="button" onClick={() => onSelect(walker)} className="text-left">
                  <p className="font-black text-[#16215c]">{walker.fullName}</p>
                  <p className="mt-1 text-xs font-semibold text-[#687280]">{walker.workLocation ?? copy.noData}</p>
                </button>
              </td>
              <td className="px-4 py-4"><Badge label={copy.labels[walker.verificationStatus] ?? walker.verificationStatus} tone="sand" /></td>
              <td className="px-4 py-4"><StatusBadge status={walker.status} copy={copy} /></td>
              <td className="px-4 py-4">{walker.isAcceptingBookings ? copy.yes : copy.no}</td>
              <td className="px-4 py-4"><RiskBadge risk={walker.riskLevel} copy={copy} /></td>
              <td className="px-4 py-4"><ActionButtons status={walker.status} copy={copy} onAction={(action) => onAction(walker, action)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function AlertsOperationsTable({
  alerts,
  isLoading,
  copy,
  onSelect,
  onModerate,
}: {
  alerts: AdminCommunityAlert[];
  isLoading: boolean;
  copy: ReturnType<typeof getCopy>;
  onSelect: (item: AdminCommunityAlert) => void;
  onModerate: (item: AdminCommunityAlert, status: AlertStatus) => void;
}) {
  return (
    <TableShell isLoading={isLoading} empty={alerts.length === 0} copy={copy}>
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.08em] text-[#687280]">
          <tr>
            <th className="px-4 py-3 font-black">{copy.alert}</th>
            <th className="px-4 py-3 font-black">{copy.reporter}</th>
            <th className="px-4 py-3 font-black">{copy.status}</th>
            <th className="px-4 py-3 font-black">{copy.evidence}</th>
            <th className="px-4 py-3 font-black">{copy.updated}</th>
            <th className="px-4 py-3 font-black">{copy.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f6]">
          {alerts.map((alert) => (
            <tr key={alert.id} className="text-[#526071] hover:bg-[#fbfcff]">
              <td className="px-4 py-4">
                <button type="button" onClick={() => onSelect(alert)} className="text-left">
                  <p className="font-black text-[#16215c]">{alert.petName}</p>
                  <p className="mt-1 text-xs font-semibold text-[#687280]">{copy.labels[alert.alertType] ?? alert.alertType} · {alert.lastSeenLocation ?? copy.noData}</p>
                </button>
              </td>
              <td className="px-4 py-4">{alert.reporterName}</td>
              <td className="px-4 py-4"><Badge label={copy.labels[alert.status] ?? alert.status} tone={alert.status === "false_report" ? "red" : "blue"} /></td>
              <td className="px-4 py-4">{alert.evidenceUrl ? copy.preserved : copy.noData}</td>
              <td className="px-4 py-4">{formatDate(alert.updatedAt)}</td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <MiniButton icon={Eye} label={copy.review} onClick={() => onSelect(alert)} />
                  <MiniButton icon={ShieldCheck} label={copy.markFalse} onClick={() => onModerate(alert, "false_report")} />
                  <MiniButton icon={RotateCcw} label={copy.resolve} onClick={() => onModerate(alert, "resolved")} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function AuditTable({
  logs,
  isLoading,
  copy,
  onSelect,
}: {
  logs: AdminAuditLog[];
  isLoading: boolean;
  copy: ReturnType<typeof getCopy>;
  onSelect: (item: AdminAuditLog) => void;
}) {
  return (
    <TableShell isLoading={isLoading} empty={logs.length === 0} copy={copy}>
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.08em] text-[#687280]">
          <tr>
            <th className="px-4 py-3 font-black">{copy.action}</th>
            <th className="px-4 py-3 font-black">{copy.entity}</th>
            <th className="px-4 py-3 font-black">{copy.reason}</th>
            <th className="px-4 py-3 font-black">{copy.date}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f6]">
          {logs.map((log) => (
            <tr key={log.id} className="text-[#526071] hover:bg-[#fbfcff]">
              <td className="px-4 py-4">
                <button type="button" onClick={() => onSelect(log)} className="font-black text-[#16215c]">
                  {log.action}
                </button>
              </td>
              <td className="px-4 py-4">{log.entityType}</td>
              <td className="px-4 py-4">{log.reason}</td>
              <td className="px-4 py-4">{formatDate(log.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function DetailPanel({ selection, copy }: { selection: Selection | null; copy: ReturnType<typeof getCopy> }) {
  return (
    <aside className="rounded-[1.7rem] border border-white bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-[#6d7cff]" />
        <h3 className="text-lg font-black text-[#16215c]">{copy.detail}</h3>
      </div>
      {!selection ? (
        <p className="mt-4 text-sm font-semibold leading-6 text-[#687280]">{copy.selectDetail}</p>
      ) : (
        <div className="mt-5 space-y-3 text-sm">
          {Object.entries(flattenSelection(selection, copy)).map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#e5e7eb] bg-[#fbfcff] p-3">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-[#8b95a4]">{label}</p>
              <p className="mt-1 break-words font-bold text-[#16215c]">{value || copy.noData}</p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

function ActionModal({
  action,
  copy,
  isPending,
  error,
  onClose,
  onSubmit,
}: {
  action: PendingAction;
  copy: ReturnType<typeof getCopy>;
  isPending: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (reason: string, confirmImpact: boolean) => void;
}) {
  const [reason, setReason] = useState("");
  const [confirmImpact, setConfirmImpact] = useState(false);
  const title = action.target === "alert"
    ? copy.moderateAlert
    : `${copy.labels[action.action]} ${action.target === "user" ? copy.user : copy.walker}`;
  const name = action.target === "alert" ? action.item.petName : action.item.fullName;
  const disabled = reason.trim().length === 0 || !confirmImpact || isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16215c]/35 px-4 backdrop-blur-sm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(reason, confirmImpact);
        }}
        className="w-full max-w-lg rounded-[1.7rem] bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff7e6] text-[#b56e00]">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-[#16215c]">{title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#687280]">
              {copy.impactSummary} <span className="font-black text-[#16215c]">{name}</span>.
            </p>
          </div>
        </div>

        <label className="mt-5 block text-sm font-black text-[#16215c]">
          {copy.reasonRequired}
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] p-3 text-sm font-semibold text-[#16215c] outline-none focus:border-[#6d7cff]"
          />
        </label>

        <label className="mt-4 flex items-start gap-3 rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] p-3 text-sm font-semibold text-[#526071]">
          <input
            type="checkbox"
            checked={confirmImpact}
            onChange={(event) => setConfirmImpact(event.target.checked)}
            className="mt-1"
          />
          {copy.confirmImpact}
        </label>

        {error ? (
          <p className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm font-semibold text-[#b91c1c]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-2xl border border-[#dfe5ef] px-4 text-sm font-black text-[#16215c]">
            {copy.cancel}
          </button>
          <button
            type="submit"
            disabled={disabled}
            className="h-11 rounded-2xl bg-[#6d7cff] px-4 text-sm font-black text-white shadow-lg shadow-[#6d7cff]/18 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? copy.saving : copy.confirm}
          </button>
        </div>
      </form>
    </div>
  );
}

function ActionButtons({
  status,
  copy,
  onAction,
}: {
  status: string;
  copy: ReturnType<typeof getCopy>;
  onAction: (action: EntityAction) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {status === "active" ? (
        <MiniButton icon={ShieldAlert} label={copy.suspend} onClick={() => onAction("suspend")} />
      ) : (
        <MiniButton icon={RotateCcw} label={copy.reactivate} onClick={() => onAction("reactivate")} />
      )}
      {status !== "deleted" ? (
        <MiniButton icon={Trash2} label={copy.deleteLogical} onClick={() => onAction("delete")} />
      ) : null}
    </div>
  );
}

function TableShell({
  isLoading,
  empty,
  copy,
  children,
}: {
  isLoading: boolean;
  empty: boolean;
  copy: ReturnType<typeof getCopy>;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-[1.7rem] bg-white" />;
  }

  if (empty) {
    return (
      <div className="rounded-[1.7rem] border border-white bg-white p-6 text-sm font-semibold text-[#687280] shadow-sm">
        {copy.empty}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[1.7rem] border border-white bg-white shadow-sm">
      {children}
    </div>
  );
}

function TabButton({ active, icon: Icon, label, onClick }: { active: boolean; icon: typeof Users2; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-black transition ${
        active ? "bg-[#6d7cff] text-white shadow-lg shadow-[#6d7cff]/18" : "text-[#687280] hover:bg-[#eef1ff] hover:text-[#16215c]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function MiniButton({ icon: Icon, label, onClick }: { icon: typeof Eye; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-[#dfe5ef] bg-white px-3 text-xs font-black text-[#16215c] transition hover:border-[#6d7cff]/40 hover:text-[#6d7cff]"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] px-3 text-sm font-black text-[#16215c] outline-none focus:border-[#6d7cff]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function StatusBadge({ status, copy }: { status: string; copy: ReturnType<typeof getCopy> }) {
  const tone = status === "active" ? "green" : status === "suspended" ? "amber" : "red";
  return <Badge label={copy.labels[status] ?? status} tone={tone} />;
}

function RiskBadge({ risk, copy }: { risk: RiskLevel; copy: ReturnType<typeof getCopy> }) {
  const tone = risk === "high" ? "red" : risk === "medium" ? "amber" : "green";
  return <Badge label={copy.labels[risk]} tone={tone} />;
}

function Badge({ label, tone }: { label: string; tone: "blue" | "green" | "amber" | "red" | "sand" }) {
  const tones = {
    blue: "border-[#6d7cff]/35 bg-[#eef1ff] text-[#4f5edb]",
    green: "border-[#68d391]/45 bg-[#eafbf0] text-[#2f8a5b]",
    amber: "border-[#f6c86a]/45 bg-[#fff7e6] text-[#8d5b13]",
    red: "border-[#fecaca] bg-[#fff1f2] text-[#b91c1c]",
    sand: "border-[#f6c86a]/35 bg-[#fcf8ee] text-[#8d5b13]",
  };

  return <span className={`inline-flex rounded-2xl border px-3 py-1 text-xs font-black ${tones[tone]}`}>{label}</span>;
}

function flattenSelection(selection: Selection, copy: ReturnType<typeof getCopy>) {
  if (selection.type === "user") {
    return {
      [copy.name]: selection.item.fullName,
      Email: selection.item.email,
      [copy.phone]: selection.item.phone,
      [copy.location]: selection.item.location,
      [copy.status]: copy.labels[selection.item.status],
      [copy.risk]: copy.labels[selection.item.riskLevel],
    };
  }

  if (selection.type === "walker") {
    return {
      [copy.name]: selection.item.fullName,
      Email: selection.item.email,
      [copy.location]: selection.item.workLocation,
      [copy.verification]: copy.labels[selection.item.verificationStatus] ?? selection.item.verificationStatus,
      [copy.status]: copy.labels[selection.item.status],
      [copy.bookings]: selection.item.isAcceptingBookings ? copy.yes : copy.no,
    };
  }

  if (selection.type === "alert") {
    return {
      [copy.pet]: selection.item.petName,
      [copy.type]: copy.labels[selection.item.alertType] ?? selection.item.alertType,
      [copy.reporter]: selection.item.reporterName,
      [copy.status]: copy.labels[selection.item.status] ?? selection.item.status,
      [copy.descriptionLabel]: selection.item.description,
      [copy.evidence]: selection.item.evidenceUrl,
      [copy.reason]: selection.item.moderationReason,
    };
  }

  return {
    [copy.action]: selection.item.action,
    [copy.entity]: `${selection.item.entityType} · ${selection.item.entityId}`,
    [copy.reason]: selection.item.reason,
    [copy.date]: formatDate(selection.item.createdAt),
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

function getCopy(language: "es" | "en") {
  const isEn = language === "en";
  return {
    eyebrow: isEn ? "Support operations" : "Operacion de soporte",
    title: isEn ? "Users, walkers, and community alerts." : "Usuarios, walkers y alertas comunitarias.",
    description: isEn
      ? "Search key entities, review context, moderate alerts, and apply account actions with reason, confirmation, and audit trail."
      : "Busca entidades clave, revisa contexto, modera alertas y aplica acciones de cuenta con motivo, confirmacion y auditoria.",
    users: isEn ? "Users" : "Usuarios",
    walkers: "Walkers",
    alerts: isEn ? "Alerts" : "Alertas",
    audit: isEn ? "Audit" : "Auditoria",
    searchPlaceholder: isEn ? "Search by name, email, location, or alert" : "Buscar por nombre, email, ubicacion o alerta",
    user: isEn ? "User" : "Usuario",
    walker: "Walker",
    role: "Rol",
    status: isEn ? "Status" : "Estado",
    risk: isEn ? "Risk" : "Riesgo",
    registered: isEn ? "Created" : "Registro",
    actions: isEn ? "Actions" : "Acciones",
    verification: isEn ? "Verification" : "Verificacion",
    bookings: isEn ? "Bookings" : "Reservas",
    alert: isEn ? "Alert" : "Alerta",
    reporter: isEn ? "Reporter" : "Reporta",
    evidence: isEn ? "Evidence" : "Evidencia",
    updated: isEn ? "Updated" : "Actualizada",
    action: isEn ? "Action" : "Accion",
    entity: isEn ? "Entity" : "Entidad",
    reason: isEn ? "Reason" : "Motivo",
    date: isEn ? "Date" : "Fecha",
    detail: isEn ? "Operational detail" : "Detalle operativo",
    selectDetail: isEn ? "Select a row to inspect actionable context." : "Selecciona una fila para revisar contexto accionable.",
    empty: isEn ? "No records match the current filters." : "No hay registros con los filtros actuales.",
    noData: isEn ? "No data" : "Sin dato",
    yes: isEn ? "Yes" : "Si",
    no: "No",
    review: isEn ? "Review" : "Revisar",
    markFalse: isEn ? "False" : "Falsa",
    resolve: isEn ? "Resolve" : "Resolver",
    suspend: isEn ? "Suspend" : "Suspender",
    reactivate: isEn ? "Reactivate" : "Reactivar",
    deleteLogical: isEn ? "Logical delete" : "Eliminar logico",
    moderateAlert: isEn ? "Moderate alert" : "Moderar alerta",
    impactSummary: isEn ? "This action will affect" : "Esta accion impactara a",
    reasonRequired: isEn ? "Required reason" : "Motivo obligatorio",
    confirmImpact: isEn
      ? "I reviewed the impact and confirm this administrative action."
      : "Revise el impacto y confirmo esta accion administrativa.",
    cancel: isEn ? "Cancel" : "Cancelar",
    confirm: isEn ? "Confirm action" : "Confirmar accion",
    saving: isEn ? "Saving..." : "Guardando...",
    preserved: isEn ? "Preserved" : "Preservada",
    name: isEn ? "Name" : "Nombre",
    phone: isEn ? "Phone" : "Telefono",
    location: isEn ? "Location" : "Ubicacion",
    pet: isEn ? "Pet" : "Mascota",
    type: isEn ? "Type" : "Tipo",
    descriptionLabel: isEn ? "Description" : "Descripcion",
    labels: {
      active: isEn ? "Active" : "Activo",
      suspended: isEn ? "Suspended" : "Suspendido",
      deleted: isEn ? "Deleted" : "Eliminado",
      user: isEn ? "User" : "Usuario",
      walker: "Walker",
      low: isEn ? "Low" : "Bajo",
      medium: isEn ? "Medium" : "Medio",
      high: isEn ? "High" : "Alto",
      pending: isEn ? "Pending" : "Pendiente",
      approved: isEn ? "Approved" : "Aprobado",
      rejected: isEn ? "Rejected" : "Rechazado",
      lost: isEn ? "Lost" : "Perdida",
      found: isEn ? "Found" : "Encontrada",
      under_review: isEn ? "Under review" : "En revision",
      resolved: isEn ? "Resolved" : "Resuelta",
      dismissed: isEn ? "Dismissed" : "Descartada",
      false_report: isEn ? "False report" : "Falsa",
      suspend: isEn ? "Suspend" : "Suspender",
      reactivate: isEn ? "Reactivate" : "Reactivar",
      delete: isEn ? "Logical delete" : "Eliminar logico",
    } as Record<string, string>,
    accountStatusOptions: [
      { value: "", label: isEn ? "All statuses" : "Todos los estados" },
      { value: "active", label: isEn ? "Active" : "Activo" },
      { value: "suspended", label: isEn ? "Suspended" : "Suspendido" },
      { value: "deleted", label: isEn ? "Deleted" : "Eliminado" },
    ],
    alertStatusOptions: [
      { value: "", label: isEn ? "All statuses" : "Todos los estados" },
      { value: "active", label: isEn ? "Active" : "Activa" },
      { value: "under_review", label: isEn ? "Under review" : "En revision" },
      { value: "resolved", label: isEn ? "Resolved" : "Resuelta" },
      { value: "dismissed", label: isEn ? "Dismissed" : "Descartada" },
      { value: "false_report", label: isEn ? "False report" : "Falsa" },
    ],
    roleOptions: [
      { value: "", label: isEn ? "All roles" : "Todos los roles" },
      { value: "user", label: isEn ? "Users" : "Usuarios" },
      { value: "walker", label: "Walkers" },
    ],
    alertTypeOptions: [
      { value: "", label: isEn ? "All alerts" : "Todas las alertas" },
      { value: "lost", label: isEn ? "Lost" : "Perdidas" },
      { value: "found", label: isEn ? "Found" : "Encontradas" },
    ],
    verificationOptions: [
      { value: "", label: isEn ? "All verification" : "Toda verificacion" },
      { value: "pending", label: isEn ? "Pending" : "Pendiente" },
      { value: "approved", label: isEn ? "Approved" : "Aprobado" },
      { value: "rejected", label: isEn ? "Rejected" : "Rechazado" },
    ],
  };
}
