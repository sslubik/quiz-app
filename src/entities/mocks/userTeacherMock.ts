import { UserRoleEnum } from "../user.entity";

export const userTeacherMock = {
    id: null,
    username: "TeacherUser",
    email: "teacher@gmail.com",
    fullname: "John Doe",
    password: "qwerty",
    user_role: UserRoleEnum.TEACHER
}