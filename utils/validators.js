// A helper function to validate booking form data
export const validateBooking = (formData, setErrors) => {
  const newErrors = {};

  // Full Name validation
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  } else if (formData.fullName.trim()?.length < 2) {
    newErrors.fullName = "Full name must be at least 2 characters";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
  }

  // Ghana phone number validation (10 digits)
  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  } else {
    // Remove all non-digits
    const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
    if (phoneDigits?.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    } else if (!phoneDigits.startsWith("0")) {
      newErrors.phoneNumber = "Ghana phone numbers should start with 0";
    }
  }

  // Check-in date validation
  if (!formData.checkInDate) {
    newErrors.checkInDate = "Check-in date is required";
  } else {
    const checkInDate = new Date(formData.checkInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      newErrors.checkInDate = "Check-in date cannot be in the past";
    }
  }

  // Check-out date validation
  if (!formData.checkOutDate) {
    newErrors.checkOutDate = "Check-out date is required";
  } else if (formData.checkInDate) {
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);

    if (checkOutDate <= checkInDate) {
      newErrors.checkOutDate = "Check-out date must be after check-in date";
    } else {
      // Check if stay is too long (e.g., more than 30 days)
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 30) {
        newErrors.checkOutDate = "Maximum stay is 30 days";
      }
    }
  }

  // Adults validation
  if (!formData.adults || parseInt(formData.adults) <= 0) {
    newErrors.adults = "Number of adults is required and must be at least 1";
  }

  // Children validation
  if (
    formData.children === undefined ||
    formData.children === null ||
    formData.children === ""
  ) {
    newErrors.children =
      "Number of children is required (use 0 if no children)";
  } else if (parseInt(formData.children) < 0) {
    newErrors.children = "Number of children cannot be negative";
  }

  // Room Type validation
  if (!formData.roomType || !formData.roomType.trim()) {
    newErrors.roomType = "Room type is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors)?.length === 0;
};

export const validateRoom = (formData) => {
  const errors = {};

  // Basic Information Validation
  if (!formData.name?.trim()) {
    errors.name = "Room name is required";
  }

  if (!formData.roomNumber?.trim()) {
    errors.roomNumber = "Room number is required";
  }

  if (!formData.roomType) {
    errors.roomType = "Room type is required";
  }

  if (!formData.price || parseFloat(formData.price) <= 0) {
    errors.price = "Valid price is required";
  }

  if (!formData.description?.trim()) {
    errors.description = "Room description is required";
  }

  // Room Details Validation
  if (!formData.roomSize?.trim()) {
    errors.roomSize = "Room size is required";
  }

  if (!formData.totalBeds || parseInt(formData.totalBeds) <= 0) {
    errors.totalBeds = "Total beds must be at least 1";
  }

  if (
    !formData.rating ||
    parseInt(formData.rating) < 1 ||
    parseInt(formData.rating) > 5
  ) {
    errors.rating = "Rating must be between 1 and 5";
  }

  // Bed Configuration Validation
  const totalBeds = parseInt(formData.totalBeds) || 0;
  const configuredBeds = formData.bedTypes.reduce((sum, bed) => {
    return sum + (parseInt(bed.quantity) || 0);
  }, 0);

  if (configuredBeds > totalBeds) {
    errors.bedConfiguration = "Bed configuration exceeds total beds";
  }

  if (formData.bedTypes.some((bed) => !bed.type || !bed.quantity)) {
    errors.bedTypes = "All bed types must have type and quantity specified";
  }

  // Guest Capacity Validation
  const maxGuests = parseInt(formData.maxGuests) || 0;
  const maxAdults = parseInt(formData.maxAdults) || 0;
  const maxChildren = parseInt(formData.maxChildren) || 0;

  if (!formData.maxGuests || maxGuests <= 0) {
    errors.maxGuests = "Maximum guests is required";
  }

  if (!formData.maxChildren || maxChildren <= 0) {
    errors.maxChildren = "Maximum children is required";
  }
  if (!formData.maxAdults || maxAdults <= 0) {
    errors.maxAdults = "Maximum adults is required";
  }

  if (maxAdults + maxChildren > maxGuests) {
    errors.guestCapacity = "Adults + Children cannot exceed maximum guests";
  }

  if (maxAdults > maxGuests) {
    errors.maxAdults = "Adults cannot exceed maximum guests";
  }

  // Facilities Validation
  if (!formData.bathroomType) {
    errors.bathroomType = "Bathroom type is required";
  }

  if (!formData.housekeepingFrequency) {
    errors.housekeepingFrequency = "Housekeeping frequency is required";
  }

  // Amenities and Tags Validation
  const validAmenities = formData.amenities.filter(
    (amenity) => amenity.trim() !== ""
  );

  if (validAmenities?.length === 0) {
    errors.amenities = "At least one amenity is required";
  }

  // Images Validation
  if (!formData.images || formData.images.length === 0) {
    errors.images = "At least one image is required";
  }

  // const validTags = formData.tags.filter((tag) => tag.trim() !== "");
  // if (validTags?.length === 0) {
  //   errors.tags = "At least one tag is required";
  // }

  return {
    isValid: Object.keys(errors)?.length === 0,
    errors,
  };
};

export const validateGuestCapacity = (maxGuests, maxAdults, maxChildren) => {
  const guests = parseInt(maxGuests) || 0;
  const adults = parseInt(maxAdults) || 0;
  const children = parseInt(maxChildren) || 0;

  return {
    isValid: adults + children <= guests && adults <= guests,
    exceedsLimit: adults + children > guests,
  };
};

export const validateBedConfiguration = (totalBeds, bedTypes) => {
  const total = parseInt(totalBeds) || 0;
  const configured = bedTypes.reduce((sum, bed) => {
    return sum + (parseInt(bed.quantity) || 0);
  }, 0);

  return {
    isValid: configured <= total,
    exceedsTotal: configured > total,
    remaining: Math.max(0, total - configured),
  };
};

export const validateSignInForm = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// Form validation function
export const validateSignUpForm = (formData) => {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = "Password must contain uppercase, lowercase, and number";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formData.role || formData.role === "Select Role") {
    errors.role = "Please select a role";
  }

  return errors;
};
