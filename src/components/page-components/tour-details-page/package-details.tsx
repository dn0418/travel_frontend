// @flow strict

import { Container } from "@mui/material";
import { useState } from "react";
import ExpandedSectionTitle from "../../shared/expanded-section-title";


function PackageDetails() {
  const [isReviewShow, setIsReviewShow] = useState(false);

  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Package Details"
        onchange={handleChangeFunction}
      />
      <div hidden={!isReviewShow} className="transition-all duration-1000 ease-in-out ">
        <Container>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo vel facilis dolorem natus doloribus, error, repellat asperiores beatae alias est, aperiam itaque dolores! Quas dolorem facilis, reprehenderit architecto eligendi accusantium tenetur fugit impedit blanditiis totam doloribus nemo vitae quisquam beatae facere atque! Iure odit eum ipsum saepe nostrum officia aspernatur deleniti possimus quo ipsa temporibus consectetur dignissimos nesciunt, necessitatibus pariatur optio unde provident aliquam dolorem adipisci sapiente, at quasi blanditiis! Aut natus error aliquam, cum exercitationem at corporis sapiente laudantium eligendi atque voluptates fugiat, doloremque soluta tempora. Harum corrupti iste repellat mollitia, quaerat accusamus quod ipsum adipisci officiis eligendi voluptatum autem, laudantium aliquid? Necessitatibus dolorum eum, voluptatem inventore quo magni. At delectus voluptas, repellat sint quia sequi quos placeat excepturi asperiores eos amet suscipit, libero maxime? Necessitatibus, voluptatibus doloremque! Voluptas provident porro blanditiis assumenda. Neque soluta blanditiis quos reprehenderit voluptates porro mollitia laborum vel, id consectetur quae nesciunt quibusdam quis, dolores aut. Sit ratione porro beatae, unde autem, pariatur tempora velit corrupti non eaque ut corporis perferendis in ipsa repellat. Perferendis quo, nobis ad eius, et beatae nostrum debitis error, temporibus veritatis quisquam ratione autem deleniti quaerat illum magni vitae labore similique laborum dolorem. Quam unde soluta dicta obcaecati alias!
          </p>
        </Container>
      </div>
    </div>
  );
};

export default PackageDetails;