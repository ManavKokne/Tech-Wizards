// Header
const profile = document.querySelector(".profile");
const notification = document.querySelector(".notification");

profile.addEventListener("click", () => {
  profile.classList.toggle("active");
  notification.classList.remove("active"); // Close notification if open
});

notification.addEventListener("click", () => {
  notification.classList.toggle("active");
  profile.classList.remove("active"); // Close profile dropdown if open
});

document.addEventListener("click", (event) => {
  if (!profile.contains(event.target) && !notification.contains(event.target)) {
    profile.classList.remove("active");
    notification.classList.remove("active");
  }
});

// Filter Section
const filterButton = document.querySelector(".filter-button");
const mentorsSection = document.getElementById("mentors-section");

const mentors = [
  {
    name: "Alice Johnson",
    specialty: "Data Science",
    experience: 5,
    rating: 5,
    pricePerHour: 2500,
    img: "/Assets/mentor1.jpg",
  },
  {
    name: "Bob Smith",
    specialty: "Web Development",
    experience: 7,
    rating: 4,
    pricePerHour: 2500,
    img: "/Assets/mentor2.jpg",
  },
  {
    name: "Charlie Brown",
    specialty: "Artificial Intelligence",
    experience: 4,
    rating: 3,
    pricePerHour: 1400,
    img: "/Assets/mentor3.jpg",
  },
  {
    name: "Dana White",
    specialty: "App Development",
    experience: 6,
    rating: 5,
    pricePerHour: 1700,
    img: "/Assets/mentor4.jpg",
  },
  {
    name: "Eva Green",
    specialty: "Cybersecurity",
    experience: 8,
    rating: 2,
    pricePerHour: 2100,
    img: "/Assets/mentor5.jpg",
  },
  {
    name: "Frank Black",
    specialty: "Cloud Computing",
    experience: 5,
    rating: 4,
    pricePerHour: 1500,
    img: "/Assets/mentor6.jpg",
  },
  {
    name: "Grace Lee",
    specialty: "Game Development",
    experience: 3,
    rating: 3,
    pricePerHour: 800,
    img: "/Assets/mentor7.jpg",
  },
  {
    name: "Henry Adams",
    specialty: "DevOps",
    experience: 6,
    rating: 2,
    pricePerHour: 1500,
    img: "/Assets/mentor8.jpg",
  },
];

// Function to display mentors
const displayMentors = (mentorsToDisplay) => {
  mentorsSection.innerHTML = ""; // Clear previous results
  mentorsToDisplay.map((mentor, index) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += mentor.rating >= i ? "★" : "☆";
    }
    mentorsSection.innerHTML += `
            <div class="mentor-card" onclick="window.location.href = '/mentor.html?id=${
              index + 1
            }'">
                <div class="image-container">
                    <img src="${
                      mentor.img
                    }" alt="Mentor Image" class="mentor-image">
                    <div class="price-tag">₹${mentor.pricePerHour}/hr</div> 
                </div>
                <div class="mentor-info">
                    <h2 class="mentor-name">${mentor.name}</h2>
                    <p class="mentor-specialty">Specialty: ${
                      mentor.specialty
                    }</p>
                    <p class="mentor-experience">Experience: ${
                      mentor.experience
                    } years</p>
                    <div class="mentor-rating">
                        <span>Rating: ${mentor.rating}</span>
                        <span class="star-rating">${stars}</span>
                    </div>
                </div>
            </div>
        `;
  });
};

// Initial display of all mentors
displayMentors(mentors);

// Function to filter mentors
filterButton.addEventListener("click", () => {
  const specialty = document.getElementById("specialty").value;
  const experience = document.getElementById("experience").value;
  const price = document.getElementById("price").value;
  const rating = document.getElementById("rating").value;

  let filteredMentors = mentors;

  // Apply specialty filter
  if (specialty) {
    filteredMentors = filteredMentors.filter(
      (mentor) => mentor.specialty === specialty,
    );
    console.log(filteredMentors);
  }

  // Apply experience filter
  if (experience) {
    const [minExp, maxExp] =
      experience === "5+" ? [5, Infinity] : experience.split("-").map(Number);
    filteredMentors = filteredMentors.filter(
      (mentor) =>
        mentor.experience >= minExp && mentor.experience <= (maxExp || minExp),
    );
  }

  // Apply price filter
  if (price) {
    const [minPrice, maxPrice] =
      price === "200+"
        ? [2000, Infinity]
        : price.split("-").map((val) => val * 10);
    filteredMentors = filteredMentors.filter(
      (mentor) =>
        mentor.pricePerHour >= minPrice && mentor.pricePerHour <= maxPrice,
    );
  }

  // Apply rating filter
  if (rating) {
    filteredMentors = filteredMentors.filter(
      (mentor) => mentor.rating >= rating,
    );
  }

  // Display the filtered mentors
  displayMentors(filteredMentors);
});

// Set the minimum date to today
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
dateInput.setAttribute("min", today);

// For Filter Responsive
const filterIcon = document.getElementById("filter-icon");
const filterContainer = document.getElementById("filter-container");
const filterSection = document.getElementById("filter-section");

filterIcon.addEventListener("click", () => {
  if (filterContainer.style.display == "none") {
    filterContainer.style.display = "flex";
    filterSection.style.position = "static";
    mentorsSection.style.marginTop = "0";
  } else {
    filterContainer.style.display = "none";
    filterSection.style.position = "absolute";
    mentorsSection.style.marginTop = "100px";
  }
});

// For Search
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  let filteredMentors = mentors.filter((mentor) => {
    return (
      mentor.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase().trim()) ||
      mentor.specialty
        .toLowerCase()
        .includes(searchInput.value.toLowerCase().trim())
    );
  });

  displayMentors(filteredMentors);
});
