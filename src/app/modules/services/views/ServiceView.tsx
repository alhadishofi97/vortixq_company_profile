"use client";
import React, { useEffect, useState } from "react";
import { getService as fetchService } from "../controllers/ServiceControllers";

const ServiceView = () => {

  const [elmService, setelmService] = useState<Array<React.ReactNode | string>>([]);
  const [elmTitle, setelmTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const generateData = async () => {
      const raw = await fetchService();
      const resp = raw as unknown as { data?: unknown };
      const dataArr = Array.isArray(resp.data) ? (resp.data as unknown[]) : [];

      const rec = (dataArr[0] as unknown) as { title?: unknown; blocks?: unknown };
      const title = typeof rec?.title === "string" ? rec.title : undefined;
      const blocks = Array.isArray(rec?.blocks)
        ? (rec.blocks as unknown[]).map((b) => {
            const blk = (b as { body?: unknown })?.body;
            if (typeof blk === "string") return blk;
            return blk as React.ReactNode;
          })
        : [];

      setelmTitle(title);
      setelmService(blocks);
    };
    generateData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold">{elmTitle}</h2>
      {elmService.map((val) => val)}
    </div>
  );
};

export default ServiceView;
