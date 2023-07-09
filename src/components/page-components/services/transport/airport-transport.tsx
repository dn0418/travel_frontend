// @flow strict

import { Button } from "@mui/material";
import Image from "next/image";


function AirportTransport() {
  return (
    <div className='my-4 w-full md:my-8'>
      <div className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2 gap-4">
        <Image
          width={1000}
          height={500}
          src="https://i.ibb.co/k0qB6f3/jad-limcaco-NT1m-JPgni6-A-unsplash.png"
          className="rounded-lg"
          alt="airport transport"
          layout="responsive"
        />
        <Image
          width={1000}
          className="rounded-lg"
          height={500}
          src="https://i.ibb.co/k0qB6f3/jad-limcaco-NT1m-JPgni6-A-unsplash.png"
          alt="airport transport"
          layout="responsive"
        />
      </div>
      <p className="">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam a perferendis et voluptatibus, sint quia delectus ad ea distinctio iste, impedit commodi neque nemo numquam dignissimos aspernatur officiis, eligendi doloribus totam aperiam doloremque quos reiciendis architecto assumenda! Magnam similique voluptas aliquam dolore corporis non quibusdam provident. Voluptatum saepe quos est quaerat enim. Maxime maiores adipisci corrupti incidunt corporis amet, natus obcaecati ipsum, voluptate reiciendis cum culpa nam nisi beatae nesciunt cumque debitis sint saepe labore voluptatum earum soluta! Quae, hic ipsam nisi ut cumque, optio vel voluptatibus obcaecati autem quam accusantium ullam itaque quo nesciunt aliquam delectus saepe? Quis minus molestiae omnis nam enim deserunt aliquid alias. Et, incidunt accusantium atque dolorum modi laudantium sint natus temporibus non officiis voluptas blanditiis corporis? Voluptas ut possimus laboriosam animi, assumenda veritatis reprehenderit delectus veniam sit, nostrum debitis distinctio officia soluta ex eaque sapiente recusandae ab molestiae adipisci consectetur. Vel iure inventore nihil vero aliquid fugiat illum neque nemo recusandae eligendi itaque laudantium consequatur, quaerat temporibus ipsum nulla nostrum perspiciatis rerum commodi, mollitia libero incidunt. Nam, eveniet dolorum. Nostrum corporis modi deserunt voluptatem optio, impedit enim ipsum fugit sunt mollitia dolore a, necessitatibus in qui quas rem et illum culpa, laborum quam possimus? Omnis modi vero, magni veritatis facere autem similique cupiditate corrupti repellat laboriosam sunt eum adipisci molestias? Voluptates sit architecto corporis magnam, blanditiis deleniti vel odio cumque aliquam placeat nulla ducimus doloremque explicabo quisquam repudiandae sapiente. Aliquam velit cumque iste est quam, optio delectus quod, dolorem hic blanditiis harum officia alias provident labore illum? Optio totam, culpa corporis nostrum laudantium quod accusamus ratione ab cumque asperiores exercitationem quibusdam ducimus. Ipsam nemo id optio molestias ipsa officiis deserunt reiciendis aperiam non neque corrupti asperiores rem quos ipsum nisi culpa, iure reprehenderit delectus porro ratione, laudantium praesentium iusto. Quia itaque aspernatur nam, id consectetur non magni nulla maxime voluptate est nostrum aliquid commodi praesentium, dolore quasi illo. Molestiae saepe animi nihil consectetur illum magnam id dolores ab fugiat esse. Numquam dicta tenetur, laborum nisi nihil consectetur distinctio obcaecati exercitationem, quo ipsum eligendi minima nostrum commodi. Rerum dignissimos quas qui tempore veniam, architecto impedit quidem numquam similique asperiores repellat soluta, debitis eveniet voluptas ipsum veritatis suscipit mollitia earum quisquam? Dolor est tempora accusamus mollitia sint veritatis facere expedita impedit maxime, placeat, illo nihil animi quo vero. Neque, magnam minus. Totam natus excepturi, repellendus nam ipsam harum iusto quibusdam sint et cumque sequi! Repellendus, suscipit?
      </p>
      <div className="flex mt-5 justify-center">
        <Button variant="contained">Send Request</Button>
      </div>
    </div>
  );
};

export default AirportTransport;