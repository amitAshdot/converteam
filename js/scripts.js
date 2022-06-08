document.addEventListener("DOMContentLoaded", function () {

    // -----START IS ON SCREEN-----
    // Helper function from: http://stackoverflow.com/a/7557433/274826
    const isElementInViewport = el => {
        const pixFromElementTop = 1;
        // special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        let rect = el.getBoundingClientRect();
        return (
            (rect.top + pixFromElementTop <= 0 && rect.bottom >= 0) ||
            (rect.bottom + pixFromElementTop >=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight)) ||
            (rect.top + pixFromElementTop >= 0 &&
                rect.bottom + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight))
        );
    };
    // Detect request animation frame
    let scroll =
        window.requestAnimationFrame ||
        // IE Fallback
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    let elementsToShow = document.querySelectorAll(".show-on-scroll");

    const loop = () => {
        Array.prototype.forEach.call(elementsToShow, function (element) {
            if (isElementInViewport(element)) {
                element.classList.add("is-visible");
            } else {
                element.classList.remove("is-visible");
            }
        });

        scroll(loop);
    };

    // Call the loop for the first time
    loop();

    // -----END IS ON SCREEN-----

    // -----START URL PARAMS-----
    //get url params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const locationNum = urlParams.get("locationNum");
    const site = urlParams.get("site");
    const from = urlParams.get("from");
    let inputLocation = document.getElementsByClassName("systemfield12");
    let inputSite = document.getElementsByClassName("systemfield52");
    let inputFrom = document.getElementsByClassName("originatingleadcode");

    let locationArray = [...inputLocation];
    let siteArray = [...inputSite];
    let fromArray = [...inputFrom];
    locationArray.map(item => (item.value = locationNum));
    siteArray.map(item => (item.value = site));
    fromArray.map(item => (item.value = from));
    // -----END URL PARAMS-----

    const isNumberKey = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    let phoneNumberInput = document.getElementById("phone");
    phoneNumberInput.onkeypress = isNumberKey

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePhone = (phone) => {
        // const re = /^[0-9]{10}$/;
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        return re.test(String(phone));
    }

    const validateForm = () => {
        let flag = false
        let name = document.getElementById("name");
        let email = document.getElementById("email")
        let phone = document.getElementById("phone")
        let buss = document.getElementById("buss")
        let area = document.getElementById("area")
        let message = document.getElementById("message")

        name.classList.remove("error")
        email.classList.remove("error")
        phone.classList.remove("error")
        buss.classList.remove("error")
        area.classList.remove("error")
        message.classList.remove("error")
        if (name.value === "" || name.value.length < 2) {
            name.classList.add("error");
            flag = true;
        }
        if (validateEmail(email.value) === false) {
            email.classList.add("error");
            flag = true;
        }
        if (validatePhone(phone.value) === false) {
            phone.classList.add("error");
            flag = true;
        }
        if (buss.value === "") {
            buss.classList.add("error");
            flag = true;
        }
        if (area.value === "") {
            area.classList.add("error");
            flag = true;
        }
        if (flag) {
            message.innerHTML = "אנא מלא/י את כל השדות הנדרשים";
            message.classList.add("error");
        }
        return flag ? false : true;
    }
    const submitForm = (e) => {
        if (validateForm()) {
            // document.getElementById("form").submit();

            e.preventDefault();
            debugger
            let form = document.getElementById("form");
            let formData = new FormData(form);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "../mail.php");
            xhr.send(formData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("success");
                } else {
                    console.log("error");
                }
            };
            xhr.onerror = function () {
                console.log("error");
            };
            xhr.onprogress = function () {
                console.log("progress");
            };
            xhr.ontimeout = function () {
                console.log("timeout");
            };
            xhr.onabort = function () {
                console.log("abort");
            };


            // var data = $(this).serialize();
            // $.ajax({
            //     type: "POST",
            //     url: './mail.php',
            //     data: data,
            //     success: function (mail) {
            //         window.location.href = 'thankyou.html';
            //     }
            // });
        } else {
            e.preventDefault();
        }
    }
    document.getElementById("form").addEventListener("submit", submitForm);
});