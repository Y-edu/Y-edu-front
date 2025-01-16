"use client";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(await fetch("http://localhost:3000/api/users"));
    };
    setTimeout(() => {
      fetchUsers();
    }, 100);
  });
  return (
    <div className="font-pretendard">
      <h1 className="font-pretendard font-bold">아아</h1>asdasd
    </div>
  );
}
