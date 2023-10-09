// @flow strict

import { Container } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { paymentMethod } from "../../../utils/data/payment-method-data";
import { localizationData } from "../../../utils/locales";
import SectionTitle from "../../common/section-title";

function PaymentMethod() {
  const { locale } = useRouter();

  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  return (
    <div className='bg-[#FFF8F6] py-5 md:py-8 w-screen my-6' aria-label="Payment Method">
      <Container>
        <SectionTitle title={localData.home_payment_title} />
        <div className='flex items-center gap-6 md:gap-12 overflow-x-auto'>
          {paymentMethod.map((item, index) => (
            <Image
              key={index}
              src={item.img}
              width={42}
              height={28}
              alt={item.alt}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default PaymentMethod;
