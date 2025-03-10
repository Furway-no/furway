"use client";

import "./index.scss";

import { useRouter } from "next/navigation";
import type { PayloadAdminBarProps, PayloadMeUser } from "payload-admin-bar";
import { PayloadAdminBar } from "payload-admin-bar";
import React, { useState } from "react";

import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";

const baseClass = "admin-bar";

const Title: React.FC = () => <span>Admin Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <div
      className={cn(baseClass, "py-2 bg-black text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
