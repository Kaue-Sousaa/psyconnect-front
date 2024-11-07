type Role = "ADMIN" | "PROFESSOR" | "USER";

const roles: Record<string, Role[]> = {
  admin: ["ADMIN"],
  professor: ["PROFESSOR"],
  user: ["USER"],
};

interface RolePath {
  path: string;
  role: Role[];
}

const rolesPath: RolePath[] = [
  {
    path: "v1/aluno/cadastro",
    role: [...roles.admin, ...roles.professor],
  },
  {
    path: "v1/usuario/cadastro",
    role: [...roles.admin, ...roles.professor],
  },
  {
    path: "/home",
    role: roles.user,
  },
];

export default rolesPath;
