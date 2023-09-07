import React, { useState, useContext } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";
import { addRoom } from "../../api/rooms";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const location = form.location.value;
    const title = form.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.files[0];
    setUploadButtonText("Uploading...");

    // Upload image
    imageUpload(image)
      .then((data) => {
        const roomData = {
          location,
          title,
          from,
          to,
          price: parseFloat(price),
          guests,
          bedrooms,
          bathrooms,
          description,
          image: data.data.display_url,
          host: {
            name: user?.displayName,
            image: user?.photURL,
            email: user?.email,
          },
          category,
        };

        // post room data to server
        addRoom(roomData)
          .then((data) => {
            console.log(data);
            setUploadButtonText("Uploaded!");
            setLoading(false);
            toast.success("Room Added!");
            navigate("/dashboard/my-listings");
          })
          .catch((err) => console.log(err));

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };
  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      handleImageChange={handleImageChange}
      uploadButtonText={uploadButtonText}
      dates={dates}
      handleDates={handleDates}
    />
  );
};

export default AddRoom;
