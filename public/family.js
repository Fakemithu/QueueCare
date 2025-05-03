// // Family Member Data Store
// let familyMembers = [
//     {
//         name: "Rahul Sharma",
//         relation: "Self",
//         bloodGroup: "B+",
//         tags: [],
//         avatar: "/api/placeholder/50/50"
//     },
//     {
//         name: "Priya Sharma",
//         relation: "Wife",
//         bloodGroup: "O+",
//         tags: [],
//         avatar: "/api/placeholder/50/50"
//     },
//     {
//         name: "Aarav Sharma",
//         relation: "Son",
//         bloodGroup: "AB+",
//         tags: ["Child"],
//         avatar: "/api/placeholder/50/50"
//     },
//     {
//         name: "D.K. Sharma",
//         relation: "Father",
//         bloodGroup: "",
//         tags: ["Senior", "Diabetic"],
//         avatar: null,
//         initials: "DK"
//     }
// ];

// // Modal Toggle Utility
// function toggleModal(modalId) {
//     const modal = document.getElementById(modalId);
//     modal.classList.toggle('open');
// }

// // Add Member Handler
// document.addEventListener('DOMContentLoaded', function () {
//     const addBtn = document.querySelector('.upload-btn');
//     const nameInput = document.getElementById('member-name');
//     const relationInput = document.getElementById('member-relation');
//     const bloodGroupInput = document.getElementById('member-blood');
//     const tagInput = document.getElementById('member-tags');
//     const submitBtn = document.getElementById('submit-member');

//     if (submitBtn) {
//         submitBtn.addEventListener('click', () => {
//             const name = nameInput.value.trim();
//             const relation = relationInput.value.trim();
//             const bloodGroup = bloodGroupInput.value.trim();
//             const tags = tagInput.value.split(',').map(tag => tag.trim());
//             if (!name || !relation) return alert("Name and relation are required.");

//             const newMember = {
//                 name,
//                 relation,
//                 bloodGroup,
//                 tags,
//                 avatar: "/api/placeholder/50/50"
//             };

//             familyMembers.push(newMember);
//             renderFamilyMembers();
//             toggleModal('addMemberModal');
//         });
//     }

//     renderFamilyMembers();
// });

// // Render Function
// function renderFamilyMembers() {
//     const container = document.querySelector('.family-members');
//     container.innerHTML = '';

//     familyMembers.forEach((member, index) => {
//         const card = document.createElement('div');
//         card.classList.add('member-card');
//         card.addEventListener('click', () => showMemberDetails(member));

//         card.innerHTML = `
//             <div class="member-avatar">
//                 ${member.avatar
//                     ? `<img src="${member.avatar}" alt="${member.name}">`
//                     : `<span>${member.initials || member.name.split(' ').map(w => w[0]).join('')}</span>`}
//             </div>
//             <div class="member-info">
//                 <div class="member-name">${member.name}</div>
//                 <div class="member-relation">${member.relation}</div>
//                 <div class="member-tags">
//                     ${member.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
//                     ${member.bloodGroup ? `<span class="tag">${member.bloodGroup}</span>` : ''}
//                 </div>
//             </div>
//         `;

//         container.appendChild(card);
//     });
// }

// // Member Details View
// function showMemberDetails(member) {
//     alert(`
// Name: ${member.name}
// Relation: ${member.relation}
// Blood Group: ${member.bloodGroup}
// Tags: ${member.tags.join(', ')}
//     `);
// }

// Section Toggling
function showDashboard() {
    document.getElementById("mainDashboard").style.display = "flex";
    document.getElementById("healthHistorySection").style.display = "none";
}

function showHealthHistory() {
    document.getElementById("mainDashboard").style.display = "none";
    document.getElementById("healthHistorySection").style.display = "block";
}

// Queue Filter
function filterQueues(status) {
    const cards = document.querySelectorAll(".queue-card");
    cards.forEach(card => {
        card.style.display = card.dataset.status === status ? "block" : "none";
    });
}

function showAllQueues() {
    const cards = document.querySelectorAll(".queue-card");
    cards.forEach(card => card.style.display = "block");
}

// History Filter
function filterHistory(memberKey) {
    // Placeholder logic: could map to actual rows via class/data attribute later
    alert(`Filtering history for: ${memberKey}`);
}

function showAllHistory() {
    alert("Showing all health history (add dynamic rows in real setup)");
}

// Modal Toggling
function toggleModal(modalId, memberId = null) {
    alert(`${modalId} modal toggled for ${memberId || 'new member'}`);
    // Implement modal logic if modals are added later
}

// Delete Member (Placeholder)
function deleteMember(memberId) {
    const memberCard = document.querySelector(`.member-card[data-id="${memberId}"]`);
    if (memberCard) {
        memberCard.remove();
        alert(`Deleted member with ID: ${memberId}`);
    }
}
function toggleModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('addMemberForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('memberName').value;
    const relation = document.getElementById('memberRelation').value;
    const bloodGroup = document.getElementById('memberBloodGroup').value;
    const tagsInput = document.getElementById('memberTags').value;

    const id = 'member' + Date.now(); // Unique ID
    const memberList = document.getElementById('familyMembersList');

    const card = document.createElement('div');
    card.className = 'member-card';
    card.dataset.id = id;

    const tagsHtml = tagsInput.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('');

    card.innerHTML = `
        <div class="member-avatar member-avatar-placeholder">
            <span>${name.split(' ').map(w => w[0]).join('').toUpperCase()}</span>
        </div>
        <div class="member-info">
            <div class="member-name">${name}</div>
            <div class="member-relation">${relation}</div>
            <div class="member-tags">
                <span class="tag">${bloodGroup}</span>
                ${tagsHtml}
            </div>
            <div class="member-actions">
                <button class="icon-button" onclick="toggleModal('editMemberModal', '${id}')">✏️</button>
                <button class="delete-btn" onclick="deleteMember('${id}')">Delete</button>
            </div>
        </div>
    `;

    memberList.appendChild(card);
    closeModal('addMemberModal');
    this.reset();
});
