// @flow strict

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { toast } from "react-toastify";
import swal from "sweetalert";
import tourClient from "../../../../rest-api/client/tour-client";
import { TourRouteType, TourType } from "../../../../types/tour";
import ExpandedSectionTitle from "../../../common/expanded-section-title";
import CreateNewRoute from "./new-route";
import UpdateTourRoute from "./update-route";

interface PropsType {
  tourDetails: TourType;
}

function UpdateRoute({ tourDetails }: PropsType) {
  const [routes, setRoutes] = useState<TourRouteType[]>(tourDetails.routes || []);
  const [openModal, setOpenModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleChangeExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddModal = () => {
    setOpenModal(!openModal);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  const changeUpdateModal = (route: any) => {
    setSelectedRoute(route);
    setUpdateModal(true);
  }

  const handleDeletePrice = async (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          closeModal: true
        }
      }
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const res = await tourClient.routes.delete(id);
            toast.success('Route deleted successfully!')
            setRoutes((previewData: any) => {
              const temp = JSON.parse(JSON.stringify(previewData));
              const filteredData = temp.filter((item: any) => item.id !== id);
              return filteredData;
            })
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      });
  }

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Tour Routes"
        onchange={handleChangeExpanded}
      />
      <div
        hidden={!isExpanded}
        className="transition-all duration-1000 ease-in-out"
      >
        <Container>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {routes.map((route, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    className="text-[#EDA592] my-1  text-[26px] 
                      bg-transparent p-0 shadow-none"
                  >
                    <FaRegDotCircle />
                  </TimelineDot>
                  {index !== routes.length - 1 && (
                    <TimelineConnector className="bg-[#EDA592]" />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Accordion className="shadow-[0px_0.5px_4px_rgba(0,0,0,0.1)] rounded-xl px-3 py-2">
                    <AccordionSummary
                      expandIcon={<MdExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h5 className="text-xl font-medium my-0">
                        {route.title}
                      </h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p>
                        {route.description}
                      </p>
                      <div className="">
                        <p className="flex items-center gap-4">
                          <BsClock className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {route.time}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {route.distance}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <GiCoffeeCup className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {route.meals}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {route.hotel}
                          </span>
                        </p>
                      </div>

                    </AccordionDetails>
                    <AccordionActions className='flex justify-end gap-2'>
                      <Button
                        variant='text'
                        color='secondary'
                        onClick={() => changeUpdateModal(route)}
                        className='shadow text-xs'>Edit</Button>
                      <Button
                        variant='text'
                        color='warning'
                        onClick={() => handleDeletePrice(route.id)}
                        className='shadow text-xs'>Delete</Button>
                    </AccordionActions>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <div className="flex mt-5 justify-end">
            <Button
              className='bg-black text-white'
              onClick={handleAddModal}
              variant='contained'>
              Add New Route
            </Button>
          </div>
        </Container>
      </div>
      <Modal
        open={openModal}
        onClose={handleAddModal}>
        <CreateNewRoute
          handleAddModal={handleAddModal}
          setRoutes={setRoutes}
          tourDetails={tourDetails}
        />
      </Modal>
      <Modal
        open={updateModal && selectedRoute !== null}
        onClose={closeUpdateModal}>
        <UpdateTourRoute
          route={selectedRoute}
          handleCancelModal={closeUpdateModal}
          setRoutes={setRoutes}
        />
      </Modal>
    </div>
  );
}

export default UpdateRoute;
