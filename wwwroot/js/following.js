$(".following").on("click", function () {
    $(this).toggleClass('bg-success');
    $(this).toggleClass('bg-primary');
    if (this.innerHTML == "追蹤"){
        this.innerHTML = "追蹤中";
    }
    else{
        this.innerHTML = "追蹤";
    }
});
