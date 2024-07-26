const customer = {
    custFirst: "John",
    custLast: "Abbot",
    birthDate: "1984-03-09",
    gender: "Male",
    email: "john.abbot@hotmail.com",
    membershipStatus: "Gold",
    roomPref: ['single', 'double'],
    paymentMeth: ['debit', 'credit', 'cash'],

    address: {
        street: '38 Goodridge',
        city: "St. John's",
        province: 'NL',
        postal: 'A1C2Y1',
        country: 'Canada'
    },


    phoneNum: '(709) 765-9468',

    emergencyContact: {
        name: "Sam Michael",
        relation: "Friend",
        phoneNum: '(709) 765-4567'
    },


    checkInOut: {
        checkInDate: '2024-03-09',
        checkOutDate: '2024-03-13'
    },


    roomDetails: {
        roomNumber: 101,
        roomType: 'Double',
        roomRate: 150.00
    },


    additionalServices: [
        { service: 'Spa', cost: 100.00 },
        { service: 'Restaurant', cost: 50.00 },
        { service: 'Laundry', cost: 25.00 }
    ],


    billingInfo: {
        billingAddress: '38 Goodridge St., St. John\'s, NL, A1C2Y1, Canada',
        totalAmountDue: 525.00,
        amountPaid: 400.00,
        outstandingBalance: 125.00
    },


    loyaltyProgram: {
        enrolled: true,
        level: 'Gold',
        pointsBalance: 5000
    },


    preferences: {
        smoking: false,
        floorPreference: "high",
        specialRequests: ["Late check-out", "Extra pillows"],
        favoriteActivities: ["Swimming", "Hiking", "Reading"],
        mealPreferences: {
            breakfast: ["Pancakes", "Coffee"],
            lunch: ["Salad", "Grilled Chicken"],
            dinner: ["Steak", "Mashed Potatoes", "Juice"]
        }
    },


    marketingPreferences: {
        email: true,
        sms: false,
        post: true
    },


    getAge: function() {
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },


    stay: function() {
        const checkIn = new Date(this.checkInOut.checkInDate);
        const checkOut = new Date(this.checkInOut.checkOutDate);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return diffDays - 1; // Adjust for inclusive check-in/check-out days
    },


    calculateTotalExpenditure: function() {
        const roomExpenditure = this.stay() * this.roomDetails.roomRate;
        const servicesExpenditure = this.additionalServices.reduce((total, service) => total + service.cost, 0);
        const totalExpenditure = roomExpenditure + servicesExpenditure;
        return totalExpenditure;
    },


    calculateLoyaltyPointsEarned: function() {
        const pointsPerDollar = 10; // Example points earned per dollar spent
        const totalExpenditure = this.calculateTotalExpenditure();
        return totalExpenditure * pointsPerDollar;
    },
    

    html: function() {
        const additionalServices = this.additionalServices.map(service => `${service.service} ($${service.cost.toFixed(2)})`).join(', ');
        return `
            <p>
                Meet ${this.custFirst} ${this.custLast}, a ${this.getAge()}-year-old ${this.gender} who prefers ${this.roomPref.join(' and ')} rooms.
                ${this.custFirst} will be staying with us from ${this.checkInOut.checkInDate} to ${this.checkInOut.checkOutDate}, 
                for a total of ${this.stay()} days. Below are the details of ${this.custFirst}'s stay:
            </p>
            <p>
                <ul>
                    <li><b>Customer Name:</b> ${this.custFirst} ${this.custLast}</li>
                    <li><b>Age:</b> ${this.getAge()}</li>
                    <li><b>Gender:</b> ${this.gender}</li>
                    <li><b>Email:</b> ${this.email}</li>
                    <li><b>Membership Status:</b> ${this.membershipStatus}</li>
                    <li><b>Room Preferences:</b> ${this.roomPref.join(' and ')}</li>
                    <li><b>Payment Methods:</b> ${this.paymentMeth.join(', ')}</li>
                    <li><b>Mailing Address:</b> ${this.address.street}, ${this.address.city}, ${this.address.province}, ${this.address.postal}, ${this.address.country}</li>
                    <li><b>Phone Number:</b> ${this.phoneNum}</li>
                    <li><b>Emergency Contact:</b> ${this.emergencyContact.name}, ${this.emergencyContact.relation}, ${this.emergencyContact.phoneNum}</li>
                    <li><b>Check-In Date:</b> ${this.checkInOut.checkInDate}</li>
                    <li><b>Check-Out Date:</b> ${this.checkInOut.checkOutDate}</li>
                    <li><b>Duration of Stay:</b> ${this.stay()} days</li>
                    <li><b>Room Number:</b> ${this.roomDetails.roomNumber}</li>
                    <li><b>Room Type:</b> ${this.roomDetails.roomType}</li>
                    <li><b>Room Rate:</b> $${this.roomDetails.roomRate.toFixed(2)}</li>
                    <li><b>Additional Services:</b> ${additionalServices}</li>
                    <li><b>Total Amount Due:</b> $${this.billingInfo.totalAmountDue.toFixed(2)}</li>
                    <li><b>Amount Paid:</b> $${this.billingInfo.amountPaid.toFixed(2)}</li>
                    <li><b>Outstanding Balance:</b> $${this.billingInfo.outstandingBalance.toFixed(2)}</li>
                    <li><b>Loyalty Program Level:</b> ${this.loyaltyProgram.level}</li>
                    <li><b>Loyalty Points Balance:</b> ${this.loyaltyProgram.pointsBalance}</li>
                    <li><b>Total Expenditure:</b> $${this.calculateTotalExpenditure().toFixed(2)}</li>
                    <li><b>Loyalty Points Earned This Stay:</b> ${this.calculateLoyaltyPointsEarned()} points</li>
                    <li><b>Smoking Preference:</b> ${this.preferences.smoking ? 'Yes' : 'No'}</li>
                    <li><b>Floor Preference:</b> ${this.preferences.floorPreference}</li>
                    <li><b>Special Requests:</b> ${this.preferences.specialRequests.join(', ')}</li>
                    <li><b>Favorite Activities:</b> ${this.preferences.favoriteActivities.join(', ')}</li>
                    <li class="meal-preferences"><b>Meal Preferences:</b>
                        <ul>
                            <li><b>Breakfast:</b> ${this.preferences.mealPreferences.breakfast.join(', ')}</li>
                            <li><b>Lunch:</b> ${this.preferences.mealPreferences.lunch.join(', ')}</li>
                            <li><b>Dinner:</b> ${this.preferences.mealPreferences.dinner.join(', ')}</li>
                        </ul>
                    </li>
                    <li class="marketing-preferences"><b>Marketing Preferences:</b>
                        <ul>
                            <li><b>Email:</b> ${this.marketingPreferences.email ? 'Opted in' : 'Opted out'}</li>
                            <li><b>SMS:</b> ${this.marketingPreferences.sms ? 'Opted in' : 'Opted out'}</li>
                            <li><b>Post:</b> ${this.marketingPreferences.post ? 'Opted in' : 'Opted out'}</li>
                        </ul>
                    </li>
                </ul>
            </p>
            <p>
                John has enrolled in our loyalty program and currently holds a Gold membership with a balance of ${this.loyaltyProgram.pointsBalance} points.
                Each dollar spent earns 10 loyalty points. This stay will earn him ${this.calculateLoyaltyPointsEarned()} points.
            </p>
            <p>
                For this visit, he has booked a Double room, number 101, at a rate of $${this.roomDetails.roomRate.toFixed(2)} per night.
                His stay includes additional services like ${additionalServices}. The total amount due is $${this.billingInfo.totalAmountDue.toFixed(2)},
                of which he has paid $${this.billingInfo.amountPaid.toFixed(2)}, leaving an outstanding balance of $${this.billingInfo.outstandingBalance.toFixed(2)}.
            </p>
            <p>
                We hope to make his stay enjoyable and meet his preferences, including a high floor, non-smoking room, and special requests
                like late check-out and extra pillows. His favorite activities include swimming, hiking, and reading, which we will ensure are available for him.
            </p>
        `;
    }
};

// Example usage: inserting the description into an HTML element (if running in a browser environment)
document.getElementById('customer-description').innerHTML = customer.html();

console.log(customer);