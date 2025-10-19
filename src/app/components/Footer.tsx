"use client";
import React,{useState,useEffect} from "react";
import Image from "next/image";
import client from "@/app/util/strepiClient";
import { BrandResponse,BrandItem,BrandResponse2,BrandItem2 } from "./footerInterface";


export const getFooter = async (): Promise<BrandResponse | null> => {
  try {
    const res = client.collection("footers");
    const response = await res.find({ populate: "*" });

    // Wrap array ke object 'data'
    const result: BrandResponse = {
      data: response.data as BrandItem[], // cast tiap item ke BrandItem
    };

    // console.log('resultresultresult',result)
    return result;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
};

export const getfooter2 = async (): Promise<BrandResponse2 | null>  => {
  try {
    const res = client.collection("footer2s");
    const response = await res.find({ populate: "*" });

    // Wrap array ke object 'data'
    const result: BrandResponse2 = {
      data: response.data as BrandItem2[], // cast tiap item ke BrandItem
    };

    // console.log('resultresultresult2',result)
    return result;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};


const Footer: React.FC = () => {
  const [footer, setFooter] = useState<BrandResponse | null>(null);
  const [footer2, setFooter2] = useState<BrandResponse2 | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      const data = await getFooter(); // AboutData[] | null
      setFooter(data); // ✅ cocok
      // console.log('datadatadata',data)
    }
    async function fetchData2() {
      const data = await getfooter2(); // AboutData[] | null
      setFooter2(data); // ✅ cocok
      // console.log('datadatadata',data)
    }
    fetchData();
    fetchData2();
  }, []);
     
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto w-[90%] py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 text-white/80">
          
          {
            footer?.data.map((val,i)=>{
              return (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={val.img.url}
                    width={120}
                    height={24}
                    alt="Vortiqx Logo"
                    className="h-6 sm:h-8 w-auto"
                  />
                </div>
                <p className="text-sm sm:text-base leading-relaxed max-w-md whitespace-pre-line">
                  {val.narasi}
                </p>
              </div>
              )
            })
          }

          {
            footer2?.data.map((val,i)=>{
              return (
                <div key={i}>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">{val.judul}</h4>
                  <p className="text-sm sm:text-base leading-relaxed max-w-md whitespace-pre-line">
                  {val.narasi}
                </p>
                </div>
              )
            })
          }
     

          {/* Services */}
          {/* <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-white/80">AI Integration & Process Transformation</li>
              <li className="text-white/80">Cybersecurity Consulting</li>
              <li className="text-white/80">Security Assessment & Penetration Testing</li>
              <li className="text-white/80">Compliance & Risk Management</li>
            </ul>
          </div> */}

          {/* Contact */}
          {/* <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-white/80">Email: jane.teh@vortiqx.com</li>
              <li className="text-white/80">Phone: +60-123 563 137</li>
              <li className="text-white/80">Malaysia</li>
            </ul>
          </div> */}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs sm:text-sm text-white/60">
          © {new Date().getFullYear()} Vortiqx. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


