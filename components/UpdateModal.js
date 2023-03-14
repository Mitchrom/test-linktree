import React, { useEffect } from "react";
import { styles } from "@/styles/style";
import supabase from "@/pages/utils/supabaseClient";

const UpdateModal = ({
  links,
  setLinks,
  toUpdate,
  setToUpdate,
  isOpen,
  setIsOpen,
}) => {

  const updateLink = async () => {
    let interlude
    console.log(links);
    console.log(toUpdate);
    try {
      const { data, error } = await supabase
        .from("links")
        .update({ title: toUpdate.title, url: toUpdate.url })
        .match({ id: toUpdate.id });
      if (error) {
          console.error(error);
          return null;
        }
        let interlude = links.filter((ele) => ele.id !== toUpdate.id)
        interlude = [...interlude, toUpdate]
        console.log(interlude);
        setLinks(interlude)
        setIsOpen(false)
        return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.modal} flex flex-col items-center`}>
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
      <div>
        <button className={`${styles.button}`} onClick={() => setIsOpen(!isOpen)}>Fermer</button>
        <button
            className={`${styles.button}`}
            onClick={updateLink}
        >
            Modifier lien
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
