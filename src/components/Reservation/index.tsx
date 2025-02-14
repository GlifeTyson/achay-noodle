import { useTranslation } from "react-i18next";
import Form from "./Form";
import Info from "./Info";

const Reservation = () => {
  const { t } = useTranslation();

  return (
    <section id="reservation" className="bg-flour px-6 py-3">
      <h1 id="reservation" className="text-playfair text-5xl font-medium">
        {t("headerTitle3")}
      </h1>
      <div className="w-full h-full md:h-screen p-5 md:p-10">
        <div className="flex flex-col gap-5 w-full h-full md:flex-row">
          <div className="w-full md:w-1/2 h-full bg-darkFlour rounded-md">
            <Info />
          </div>
          <div className="flex-1">
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
