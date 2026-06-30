import type { User } from "../types";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-[#e5e7eb] bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.08em] text-[#687280]">
          <tr>
            <th className="px-4 py-3 font-black">Usuario</th>
            <th className="px-4 py-3 font-black">Documento</th>
            <th className="px-4 py-3 font-black">Telefono</th>
            <th className="px-4 py-3 font-black">Ubicacion</th>
            <th className="px-4 py-3 font-black">Registro</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f6]">
          {users.map((user) => (
            <tr key={user.id} className="text-[#526071] transition hover:bg-[#fbfcff]">
              <td className="px-4 py-4">
                <p className="font-black text-[#16215c]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#687280]">{user.email}</p>
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
