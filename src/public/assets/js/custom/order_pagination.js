let statusText = [
    "<span class='font-weight-bold text-warning'>Awaiting Confirm</span>",
    "<span class='font-weight-bold text-muted '>Preparing</span>",
    "<span class='font-weight-bold text-info'>Shipping</span>",
    "<span class='font-weight-bold text-success'>Arrived</span>",
    "<span class='font-weight-bold text-danger'>Canceled</span>"];
let status = -1;

$('.nav-link').click(function (e) {
    status = $(this).attr('status');
    render()
})

$(document).ready(function () {
    render()
})

$(document).on('click', '.btn-details', function (e) {
    const idOrder = $(this).attr('for');
    $.ajax({
        method: "get",
        url: "/api/order/details/" + idOrder,
        success: function (data) {
            renderModal(data, idOrder);
        }
    })
})

function render() {
    if (status) status = '?status=' + status;
    $('#pagination').pagination({
        dataSource: '/api/order/pagination' + status,
        locator: 'data',
        totalNumberLocator: function (response) {
            return response.totalRow;
        },
        pageSize: 5,
        showNavigator: true,
        formatNavigator: '<%= rangeStart %>-<%= rangeEnd %> of <%= totalNumber %> products',
        position: 'top',
        className: 'paginationjs-theme-yellow paginationjs',
        callback: function (data, pagination) {
            let render = ``;
            data.forEach((ele, index) => {
                let date = ele.createdAt.match(/\d+-\d+-\d+/g)[0].split('-').reverse().join('/');
                render += `
            <tr>
                <td>
                    ${ele._id}
                </td>
                <td>
                    ${statusText[ele.status]}
                </td>
                <td class="text-right">
                    ${date}
                </td>
                <td class="text-right">
                    ${ele.total.toLocaleString()}<small>đ</small>
                </td>
                <td class="text-center">
                    <button class="btn btn-primary btn-round btn-details" for="${ele._id}" type="button" data-toggle="modal" data-target="#detailModal">View details</button>
                </td>
            </tr>
            `;
            })
            $('#show-order').html(render);
        }
    })
}

function renderModal(data, idOrder) {
    let render = `<h6 class="text-primary">Order number: ${idOrder}</h6><hr>`;
    if (data.status == false) {
        render += '<h6 class="text-danger text-center">Somethings went wrong!</h6>';
    } else {
        data.data.forEach(ele => {
            render += `
                <div class="instruction">
                    <div class="row">
                        <div class="col-md-4 align-self-center">
                            <div class="picture">
                                <img src="/public/resources/images/${ele.product[0].img_url}" class="rounded img-raised">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <p class="font-weight-bold text-primary">${ele.product[0].name}</p>
                            <p>${ele.price.toLocaleString()}<small>đ</small> <span class="pull-right">x${ele.amount}</span></p>
                            <strong>Total: ${((+ele.price) * (+ele.amount)).toLocaleString()}đ</strong>
                        </div>
                    </div>
                </div>
                <hr>
            `;
        })
    }
    $('#body-modal').html(render);
}