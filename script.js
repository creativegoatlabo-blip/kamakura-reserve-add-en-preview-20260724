const courseDescriptions = {
  three: {
    title: "Handmade Wedding and Engagement Ring Course (3 rings)",
    lines: [
      "You will make three Pt900 platinum or K18 gold rings on your reservation date.",
      "Silver cannot be selected for this course.",
      "If you would like to visit for a consultation only, please select the Wedding and Engagement Ring Consultation course."
    ]
  },
  wedding: {
    title: "Handmade Wedding Ring Course",
    lines: [
      "You will make two Pt900 platinum or K18 gold rings on your reservation date.",
      "Silver cannot be selected for this course.",
      "If you would like to visit for a consultation only, please select the Wedding and Engagement Ring Consultation course."
    ]
  },
  engagement: {
    title: "Handmade Engagement Ring Course",
    lines: [
      "You will make one Pt900 platinum or K18 gold ring on your reservation date.",
      "Silver cannot be selected for this course.",
      "If you would like to visit for a consultation only, please select the Wedding and Engagement Ring Consultation course."
    ]
  },
  diamond: {
    title: "Diamond Proposal Course",
    lines: [
      "On your reservation date, you can purchase a loose diamond in a dedicated case.",
      "No ring will be made during this course.",
      "The purchased diamond can later be used as the main diamond for a handmade engagement ring."
    ]
  },
  anniversary: {
    title: "Handmade Anniversary Ring Course",
    lines: [
      "You will make one or two Pt900 platinum or K18 gold rings on your reservation date.",
      "Silver cannot be selected for this course.",
      "If you would like to visit for a consultation only, please select the Wedding and Engagement Ring Consultation course."
    ]
  },
  pair: {
    title: "Handmade Pair Ring Course",
    lines: [
      "You will make one or two K10 gold or SV950 silver rings on your reservation date.",
      "If you would like to visit for a consultation only, please select the Wedding and Engagement Ring Consultation course."
    ]
  },
  consultation: {
    title: "Wedding and Engagement Ring Consultation",
    lines: [
      "You can tour the studio and ask our ring artisans about ring designs and the production process.",
      "No ring will be made during this course.",
      "The visit usually takes about one hour."
    ]
  }
};

const options = {
  material: ["Select", "Decide after seeing samples", "Pt900 (Platinum)", "K18YG (Yellow Gold)", "K18PG (Pink Gold)", "K18WG (White Gold)"],
  design: ["Select", "Decide after seeing samples", "Rounded", "Hammered", "Flat"],
  width: ["Select", "Decide after seeing samples", "Approx. 3.0 mm", "Approx. 2.5 mm", "Approx. 2.0 mm", "Approx. 1.5 mm"],
  size: ["Select", "Measure on the day", ...Array.from({ length: 27 }, (_, i) => `JP size ${i + 1}`), "JP size 28 or above"],
  option: ["Select", "Decide after seeing samples", "Milgrain", "Wave", "Cross", "Hammered rounded", "Line", "Other"],
  optionEngage: ["Select", "Decide after seeing samples", "Pinched arm", "Milgrain", "Wave", "Wave with pinched arm", "Cross", "Hammered rounded", "Line", "Other"]
};

function createSelect(label, name, values) {
  const field = document.createElement("div");
  field.className = "field";
  const labelEl = document.createElement("label");
  labelEl.className = "label";
  labelEl.innerHTML = `<span class="tag optional">Optional</span> ${label}`;
  const select = document.createElement("select");
  select.name = name;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.textContent = value;
    select.appendChild(option);
  });
  field.append(labelEl, select);
  return field;
}

function fillRingDetails() {
  document.querySelectorAll(".detail-grid").forEach((grid) => {
    const ring = grid.dataset.ring;
    grid.append(
      createSelect("Material", `material_${ring}`, options.material),
      createSelect("Design", `design_${ring}`, options.design),
      createSelect("Width", `width_${ring}`, options.width),
      createSelect("Size", `size_${ring}`, options.size),
      createSelect("Option", `option_${ring}`, ring === "engage" ? options.optionEngage : options.option)
    );
  });
}

function updateCourseDescription(value) {
  const data = courseDescriptions[value] || courseDescriptions.three;
  const target = document.getElementById("courseDescription");
  target.innerHTML = `<strong>${data.title}</strong>${data.lines.map((line) => `<p>${line}</p>`).join("")}`;
}

document.querySelectorAll(".shop").forEach((shop) => {
  shop.addEventListener("click", () => {
    document.querySelectorAll(".shop").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    shop.classList.add("active");
    shop.setAttribute("aria-pressed", "true");
  });
});

document.getElementById("course").addEventListener("change", (event) => {
  updateCourseDescription(event.target.value);
});

document.querySelector(".toggle-detail").addEventListener("click", (event) => {
  const target = document.getElementById("ringDetail");
  const nextOpen = target.hidden;
  target.hidden = !nextOpen;
  event.currentTarget.setAttribute("aria-expanded", String(nextOpen));
});

document.querySelectorAll('input[name="time"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    document.getElementById("reserve-date").value = event.target.value;
  });
});

document.querySelector(".submit-button").addEventListener("click", () => {
  document.getElementById("submitNote").textContent = "Static preview only. No reservation will be submitted from this page.";
});

fillRingDetails();
