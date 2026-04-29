// parking data
const parkingData = {
    two: {
        left: ["free","occupied","free","free","occupied"],
        right: ["occupied","free","free","occupied","free"],
        straight: ["free","free","occupied","occupied","free"]
    },
    four: {
        left: ["occupied","occupied","free","free","free"],
        right: ["free","occupied","free","occupied","free"],
        straight: ["occupied","free","occupied","free","occupied"]
    }
};

// show vehicle section
function showVehicle(type) {
    document.getElementById("two").style.display = "none";
    document.getElementById("four").style.display = "none";

    document.getElementById(type).style.display = "block";
}

// show slots based on direction
function showSlots(vehicle, direction) {
    const slotContainer = document.getElementById(vehicle + "Slots");
    const result = document.getElementById(vehicle + "Result");

    slotContainer.innerHTML = "";

    const slots = parkingData[vehicle][direction];
    let freeCount = 0;

    slots.forEach(status => {
        const div = document.createElement("div");
        div.classList.add("slot");

        if (status === "free") {
            div.classList.add("free");   // 🟢 green
            freeCount++;
        } else {
            div.classList.add("occupied"); // 🔴 red
        }

        slotContainer.appendChild(div);
    });

    result.innerText = direction.toUpperCase() + " → Free Slots: " + freeCount;
}
