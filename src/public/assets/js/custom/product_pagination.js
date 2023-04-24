let filter_values = [];
$('.category-checkbox').click(function (e) {
    const category = $(this).find('label').attr('for');
    if (!filter_values.includes(category)) {
        filter_values.push(category);
    } else {
        filter_values.splice(filter_values.indexOf(category), 1);
    }
    window.location = '/products' + createUrl();
})

$(document).ready(function () {
    const categories = window.location.search.match(/category=\w+/g, ' ') ?? [];
    categories.forEach(ele => {
        const category = ele.split('=')[1];
        if (!filter_values.includes(category)) filter_values.push(category)

        $(document).find('input#'+category).attr('checked', true)
    })

    $('#pagination').pagination({
        dataSource: '/api/product/pagination' + createUrl(),
        locator: 'data',
        totalNumberLocator: function (response) {
            return response.totalRow;
        },
        pageSize: 2,
        showNavigator: true,
        formatNavigator: '<%= rangeStart %>-<%= rangeEnd %> of <%= totalNumber %> products',
        position: 'top',
        className: 'paginationjs-theme-yellow paginationjs',
        callback: function (data, pagination) {
            let render = ``;
            data.forEach((ele, index) => {
                render += `
            <div class="col-lg-4 col-md-6">
                <div class="card card-product card-plain">
                    <div class="card-image">
                        <a href="/product/${ele._id}">
                            <img src="/public/resources/images/${ele.img_url}"
                                 alt="..."/>
                        </a>
                    </div>
                    <div class="card-body">
                        <a href="/product/${ele._id}">
                            <h4 class="card-title" rel="tooltip" title="${ele.name}" data-placement="bottom" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${ele.name}
                            </h4>
                        </a>
                        <label class="badge badge-info">Available</label>
                        <label class="badge badge-primary">${ele.category[0].name}</label>
                        <div class="card-footer">
                            <div class="price-container">
                                <span class="price">${ele.price.toLocaleString()} đ</span>
                            </div>
                            <button class="btn btn-danger btn-neutral btn-icon btn-round pull-right"
                                    rel="tooltip" title="Remove from wishlist" data-placement="left">
                                <i class="now-ui-icons shopping_tag-content"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            })
            $('#show-products').html(render);
        }
    })
})

$('.btn-reset').click(function (e) {
    filter_values = [];
    window.location = '/products' + createUrl();
})

function createUrl() {
    let url = "?";
    filter_values.forEach((ele, i, org) => {
        url += `category=${ele}`;
        if (i != (org.length - 1)) url += "&";
    })
    return filter_values.length == 0 ? "" : url;
}
