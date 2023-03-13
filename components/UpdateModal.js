import React, { useEffect } from "react";
import { styles } from "@/styles/style";
import supabase from "@/pages/utils/supabaseClient";

const UpdateModal = ({ toUpdate, setToUpdate, isOpen, setIsOpen }) => {
console.log(toUpdate);

  const updateLink = async () => {
    try {
      const { data, error } = await supabase
        .from("links")
        .update({ title: toUpdate.title, url: toUpdate.url })
        .match({ id: toUpdate.id });
      if (error) {
        console.error(error);
        return null;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.modal}`}>
      <div onClick={() => setIsOpen(!isOpen)}>supp</div>
      <div className="mt-4">
        <input
          type="text"
          id="title"
          className="border border-gray-300 rounded-md"
          placeholder="Un lien random"
          value={toUpdate.title}
          onChange={(e) => setToUpdate({ ...toUpdate, title: e.target.value })}
        />
      </div>
      <div className="mt-4">
        <input
          type="text"
          id="url"
          className="border border-gray-300 rounded-md"
          placeholder="google.com"
          value={toUpdate.url}
          onChange={(e) => setToUpdate({ ...toUpdate, url: e.target.value })}
        />
      </div>
      <button
        className="border-2 border-black rounded-md mt-4 px-4 hover:bg-black hover:text-white"
        onClick={updateLink}
      >
        Modifier lien
      </button>

      {/* <p>{toUpdate.title}</p>
            <p>{toUpdate.url}</p> */}
    </div>
  );
};

export default UpdateModal;
