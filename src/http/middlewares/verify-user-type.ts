export function verifyUserType(typeToVerify: 'ADMIN') {
  return async ({ request, response }: any) => {
    const { type } = request.user;

    if (type !== typeToVerify) {
      return response.status(401).send({ message: "Unauthorized." });
    }
  }
}