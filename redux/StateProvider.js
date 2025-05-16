"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

//wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults,] = useState([]);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false)
  const [hasQueried, setHasQuried] = useState(false)

  // Search box and header
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/search')

  const router = useRouter();

  const toggleSearchModal = () => {
    if (hideNavbar) {
      router.back()
    } else {
      setIsSearchModalOpen((prev) => !prev)
    }
  };

  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  return (
    <StateContext.Provider
      value={{
        query,
        hideNavbar,
        openSidebar,
        recentSearches,
        isSearchModalOpen,
        showLoaderOverlay,
        searchResults,
        hasQueried,
        setHasQuried,
        setSearchResults,
        setQuery,
        setShowLoaderOverlay,
        toggleSidebar,
        setOpenSidebar,
        toggleSearchModal,
        setRecentSearches,
        setIsSearchModalOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateContex = () => useContext(StateContext);
