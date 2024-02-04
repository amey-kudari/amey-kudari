"use client";

import Image from "next/image";
import { MoviesToWatch } from "./components/MoviesToWatch";

const MAIN_IMAGE_URL = "https://lh3.googleusercontent.com/fife/AGXqzDkjqRuV-zbbrG-qly4Kk5bdyEE7fS17oFtcjU7hSSwyiEV7Heu-u3GnpGD-w1JwiMt9UxiEmQZ5oV_VnXb6zw4H9cAptDZ95JFSEkk6dFkBCFDoAJdVRcMW7Lt3Uz-pKiqNYSY1Oj7WA8GeXrLM_ycFlOJ4SqkyF_2Aon0khfJj9X5iUTu-IOVxvct9VEkKmuOn4mgXPgN6E99iQvFQnpT23wue0UBZjZysfwmQ29BusjgpISU7JLE8IYyOqfPuMtEHLJ7f6-ejsd7-d6-9f0d4tG47fWlwzPtc04oEP0GVdzqsAK8xZH2zv1e8R37YPqaSndgM4ZEbIy8W1FP5fw1ErHfmHw0ng1PdIQNxaqILd-mrXm0I2YGMqrfuhGeqYy1OCbzXhrUkQAAMWVZjjyQhQvCQkDDPCBRrXtCbYqh9reBpS65Y6ve0fSeBEqAloQVAneSoSkGt7C8SPDZ7ixfH94xz-u2i5ND_AfbYDSkpGc8gvAInBLCzDpdUW9jQeWXKdI3pqUwYW3CclCCKz-k6ESYA512EcPwnGhavM_tSHmRrkKjJYQSqNK7yYnFJw-xF_st9BTN_OahQpEt0YLBIYFYXh2ZRoj_n3IQ3B-vWnKqv4fJUJ8g1ZaypK4BZfstmxmPsZnZE4yz0S-bVaGMFYcPSgM1SHih-T6T53-HkwHtBVYsm3ZeemrfEa0Ggot_95V3oDuLuXH-jV85tH2G8jzuHjEWi6c5n24xVvRH4DRUWdsX8bxzzyW1L3Vz5CqtbgztrY5SMm51DJpYTH1o0zj-5MQv1mQqHIaKgodTCJHDY0GNhW4KwrhBRAmib5li9HoZ0Fmt-n-sNGa4AhOG5PuN6tlYKPB3nHRnFmD98SAkk-r-RwsOYQ3fxg7c5gS0IMweXFTBXhJ3Ur0LtMXTWx7Ilh-algo105R_PPqLcSZHY6y8yNmGjRbOLoMu-pX82Cy17nb9z_fvPmT2Cw0BE8gtM0XrQptTR_TVV4iSvl2a5I2cniglP-nO_Nvmi_8_wjuBpZi7ZhDeVSL-4t4OVoZw0yglTLJynwqr7PLzIbDYXkxMMXpylvKBPwipYa1_C4dOO3Pm6WNF41lDzW7o_r6xNKJSRFvG80V3J1m_pPU3_0MhL31yAHE1eLbTPCst0IpIEHOrkeR4k2-LfCOHZtvWpDrx_CL56NNubW5gKkdmI2U5q1QJxXYEss4Ly2I3OuuLFMBc2GQNFYrUeBDLCTX_2XBONK66hiaCe9E5ndZIPQjgDZiWVJnaYH8JAylHrpi_F4fYQf7LHdLYmEvtVkPFZxQ4Idmj_xpRexx8WjhaaSNPvQOPSmClmTkASGU-GdkJvoymSXFmBSVFewuCXOsv2NAN10cLTvYqoQsQIJw6aX3m_GevhkEj-F03VQx9n2GGIUM5NhiZqEzEm2U2fLEKf7RhOZ9LeJvVpLJ_RicN7pZ8xyTP1NUwtlEmj02NBDUpXgs_9vsDOtgRcJihuQTXOZd0RMM7aAFKqXXOsIzpO73BBfbtEOEfHtzxxaI86S6KS6dEyCb_DP7V2XbeMP0JZ5uN18zBS7XpiBXkmWS_k3wkupFMjH3DdKAPifRaIduxLxqIS4-1FKxsaMiZQYXFaRiXWIL8tCXPxdmuPpAZT9cONOa7k07_HUGmwmh3uMLEjzYlbprSIloIzlcJEBqCKakz7y6h1ALSeSxN1OL2c-B3LZ4a_Ardw7dFdVgkF=w2560-h1393";
const Page = () => {
  return <div>
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl mb-6">Amey and Along!</h1>
      <figure className="w-full p-1 sm:w-1/2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MAIN_IMAGE_URL} alt="Amey and Along" className="rounded-xl"/>
      <figcaption className="text-center">Since in 2022 Nov, The sane man and insane woman aim to make the woman sane </figcaption>
      </figure>
    </div>
    <MoviesToWatch />
  </div>
}

export default Page;