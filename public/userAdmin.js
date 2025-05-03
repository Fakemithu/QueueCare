// Firebase Queue Logic

function joinQueue() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("appointmentDate").value;

  if (!name || !phone || !date) {
    alert("Please fill all fields including date.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Enter a valid 10-digit phone number.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const queueRef = db.ref("queues/" + today);
  const timestamp = Date.now();
  const newEntry = { name, phone, timestamp, date };

  queueRef.push(newEntry).then((ref) => {
    document.getElementById("leaveBtn").style.display = "inline-block";
    const userId = ref.key;
    trackQueuePosition(userId, timestamp, name, phone, queueRef);
    showTicket(name, phone, today, userId);
  });
}

function showTicket(name, phone, date, userId) {
  document.getElementById("ticket").style.display = "block";
  document.getElementById("ticketName").innerText = name;
  document.getElementById("ticketPhone").innerText = phone;
  document.getElementById("ticketDate").innerText = date;
  document.getElementById("ticketPosition").innerText = "Fetching..."; // Will be updated below
}

function trackQueuePosition(userId, timestamp, name, phone, queueRef) {
  queueRef.on("value", (snapshot) => {
    const all = snapshot.val();
    if (!all) return;

    const sorted = Object.entries(all).sort((a, b) => a[1].timestamp - b[1].timestamp);
    const position = sorted.findIndex(([key, val]) => key === userId) + 1;
    const estWait = (position - 1) * 5;

    const msg = `You are #${position} in the queue. Est. wait: ${estWait} mins.`;
    const positionMsg = document.getElementById("positionMsg");
    positionMsg.innerText = msg;

    const qrData = `Name: ${name}, Phone: ${phone}, Pos: ${position}, Wait: ${estWait} mins`;
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=150x150`;
    document.getElementById("qrCode").src = qrURL;

    document.getElementById("ticketPosition").innerText = position;

    // WhatsApp Link
    const waText = `Hi ${name}, you're #${position} in the queue. Estimated wait: ${estWait} mins.`;
    const waLink = `https://wa.me/91${phone}?text=${encodeURIComponent(waText)}`;
    const waBtn = document.createElement("a");
    waBtn.href = waLink;
    waBtn.target = "_blank";
    waBtn.innerText = "Send via WhatsApp";
    waBtn.style.display = "block";
    waBtn.style.marginTop = "10px";

    // Append only once
    if (!document.getElementById("waLink")) {
      waBtn.id = "waLink";
      positionMsg.appendChild(waBtn);
    }
  });
}

function leaveQueue() {
  const phone = document.getElementById("phone").value.trim();
  const today = new Date().toISOString().split("T")[0];
  const queueRef = db.ref("queues/" + today);

  queueRef.once("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.phone === phone) {
          queueRef.child(key).remove();
          alert("You’ve left the queue.");
          location.reload();
        }
      });
    }
  });
}

// Admin Panel Logic
document.addEventListener("DOMContentLoaded", () => {
  const queueList = document.getElementById("queueList");
  if (queueList) {
    const today = new Date().toISOString().split("T")[0];
    const queueRef = db.ref("queues/" + today);

    queueRef.on("value", (snapshot) => {
      queueList.innerHTML = "";
      const queue = snapshot.val();
      if (queue) {
        const sorted = Object.entries(queue).sort((a, b) => a[1].timestamp - b[1].timestamp);
        sorted.forEach(([key, val]) => {
          const li = document.createElement("li");
          li.textContent = `${val.name} : ${val.phone}`;

          const removeBtn = document.createElement("button");
          removeBtn.innerText = "Remove";
          removeBtn.style.marginLeft = "10px";
          removeBtn.onclick = () => queueRef.child(key).remove();

          const emergencyBtn = document.createElement("button");
          emergencyBtn.innerText = "Emergency";
          emergencyBtn.style.marginLeft = "5px";
          emergencyBtn.onclick = () => {
            const updated = { ...val, timestamp: Date.now() - 1000000 };
            queueRef.child(key).set(updated);
          };

          li.appendChild(removeBtn);
          li.appendChild(emergencyBtn);
          queueList.appendChild(li);
        });
      } else {
        queueList.innerHTML = "<li>No users in queue.</li>";
      }
    });
  }
});

function nextPerson() {
  const today = new Date().toISOString().split("T")[0];
  const queueRef = db.ref("queues/" + today);

  queueRef.once("value", (snapshot) => {
    const queue = snapshot.val();
    if (queue) {
      const sorted = Object.entries(queue).sort((a, b) => a[1].timestamp - b[1].timestamp);
      if (sorted.length > 0) {
        const [firstKey] = sorted[0];
        queueRef.child(firstKey).remove();
      }
    }
  });
}
