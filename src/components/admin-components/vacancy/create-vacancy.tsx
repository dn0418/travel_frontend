import { Button, FormControlLabel, Switch, Tab, Tabs, TextField } from "@mui/material";
import { VacancyInputType } from "../../../types/input-type";
import SunPostEditor from "../../common/post-editor";
import SectionTitle from "../../common/section-title";

interface PropsType {
  handleTabChange: any;
  currentTab: {
    title: string;
    value: string;
  };
  tabs: {
    title: string;
    value: string;
  }[];
  inputData: VacancyInputType;
  setInputData: any;
  handleSubmit: any;
  handleInputChange: (name: string, value: string) => void;
  isLoading: boolean;
}

function CreateNewVacancy({
  currentTab,
  inputData,
  handleTabChange,
  tabs,
  handleSubmit,
  handleInputChange,
  isLoading,
}: PropsType) {

  return (
    <div className="w-full my-8">
      <div className="w-full flex flex-col items-center gap-4">
        <div className='lg:w-[60%] text-center py-3 px-6 regular-shadow rounded-lg'>
          <Tabs
            value={currentTab.value}
            onChange={handleTabChange}
            className='pages-tabs gap-5'
            TabIndicatorProps={{
              style: { display: "none" },
            }}>
            {
              tabs.map((tab: { value: string; title: string; }, i: number) => (
                <Tab key={i} value={tab.value} className="" label={tab.title} />
              ))
            }
          </Tabs>
        </div>
        <SectionTitle title="Create New Vacancy" />
      </div>
      <div hidden={currentTab.value !== 'en'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextField
            label='Title'
            onChange={(e: any) => handleInputChange('title', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title}
          />

          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Vacancy Details</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description', text)}
              text={inputData.description}
            />
          </div>
        </div>

        <div className="flex mx-5 lg:mx-12 justify-start mt-8">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="py-3"
            variant="contained">
            {isLoading ? "Creating..." : "Create Vacancy"}
          </Button>
        </div>
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'ru'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e: any) => handleInputChange('isRu', e.target.checked)}
                  checked={inputData.isRu}
                />
              }
              label="Should Russian language be available for this tour?"
            />
          </div>
          <TextField
            label='Title(ru)'
            onChange={(e: any) => handleInputChange('title_ru', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_ru}
          />
          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Vacancy Details(ru)</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description_ru', text)}
              text={inputData.description_ru}
            />
          </div>
        </div>
      </div>

      <div className="mt-5" hidden={currentTab.value !== 'hy'}>
        <div className="mx-5 lg:mx-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e: any) => handleInputChange('isHy', e.target.checked)}
                  checked={inputData.isHy}
                />
              }
              label="Should Armenian language be available for this tour?"
            />
          </div>
          <TextField
            label='Title(hy)'
            onChange={(e: any) => handleInputChange('title_hy', e.target.value)}
            variant='outlined'
            className="w-full"
            value={inputData.title_hy}
          />

          <div className="col-span-2 w-full">
            <p className="font-medium uppercase">Vacancy Details(hy)</p>
            <SunPostEditor
              onChange={(text: string) => handleInputChange('description_hy', text)}
              text={inputData.description_hy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewVacancy;