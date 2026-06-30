import type { User } from "../types";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Usuario</th>
            <th className="px-4 py-3 font-medium">Documento</th>
            <th className="px-4 py-3 font-medium">Telefono</th>
            <th className="px-4 py-3 font-medium">Ubicacion</th>
            <th className="px-4 py-3 font-medium">Registro</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {users.map((user) => (
            <tr key={user.id} className="text-zinc-200">
              <td className="px-4 py-4">
                <p className="font-medium text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="mt-1 text-xs text-zinc-400">{user.email}</p>
              </td>
              <td className="px-4 py-4">
                {user.idType} {user.idNumber}
              </td>
              <td className="px-4 py-4">{user.phone}</td>
              <td className="px-4 py-4">{user.location ?? "Sin registro"}</td>
              <td className="px-4 py-4">{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
