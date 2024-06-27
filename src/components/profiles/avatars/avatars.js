

export const avatarSvgArray = [
  "avatar-man1.svg",
  "avatar-man2.svg",
  "avatar-man3.svg",
  "avatar-man4.svg",
  "avatar-man5.svg",
  "avatar-woman1.svg",
  "avatar-woman2.svg",
  "avatar-woman3.svg",
  "avatar-woman4.svg",
  "avatar-woman5.svg",
];


export const avatars = avatarSvgArray.map((a) => {
    const obj = {
      name: a,
      path: `avatars/${a}`
    };
    return obj;
});

export default function getAvaterObj(name){
    const avatar = avatars.find((e) => e.name === name);
    return avatar?avatar.path:'avatars/avatar-default.svg'
}
