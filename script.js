const fileinput=document.querySelector(".file-input"),
filteroptions=document.querySelectorAll(".filter button"),
filtername=document.querySelector(".filter-info .name"),
filtervalue=document.querySelector(".filter-info .value"),
filterslider=document.querySelector(".filter input"),
rotateoption=document.querySelectorAll(".rotate button"),
previewImg=document.querySelector(".preview-img img"),
resetfilterbtn=document.querySelector(".controls .reset-filter"),
savefilterbtn=document.querySelector(".controls .save-img"),
choseimagebtn=document.querySelector(".choose-img");

let lighttoggle=document.querySelector(".caption i");
let container=document.querySelector(".container");
let light=localStorage.getItem("mod");
if(light ==="dark-mod"){
    container.classList.add("dark-mod");
    lighttoggle.classList.add("fa-toggle-on")
}

lighttoggle.addEventListener("click" , () => {
lighttoggle.classList.toggle("fa-toggle-on");
lighttoggle.classList.forEach(classitem => {
if(classitem==="fa-toggle-on"){
container.classList.add("dark-mod");
localStorage.setItem("mod" , "dark-mod");
}
else {
container.classList.remove("dark-mod");
localStorage.setItem("mod" , "");   
}

});
});


let brightnes=100 ,saturation=100,inversion=0,grayscale=0;
let rotate=0,fliphorizontal=1,flipvertical=1;

const applyfilters=() => {
previewImg.style.transform=`rotate(${rotate}deg) scale(${fliphorizontal} , ${flipvertical}) `;
previewImg.style.filter=`brightness(${brightnes}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};


const loadimage= () =>{
    let file=fileinput.files[0]; //getteing user selected file.
    if(!file) return ;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load" , ()=>{
        document.querySelector(".container").classList.remove("disable");
    });
    console.log(file)
}


filteroptions.forEach(option  => {
    option.addEventListener("click" , () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filtername.innerText=option.textContent;
        if(option.id==="brightnes"){
            filterslider.max="200";
            filterslider.value=`${brightnes}%`;
            filtervalue.innerText=`${brightnes}%`;
        }else if(option.id==="saturation"){
            filterslider.max="200";
            filterslider.value=`${saturation}%`;
            filtervalue.innerText=`${saturation}%`;
        }else if(option.id==="inversion"){
            filterslider.max="100";
            filterslider.value=`${inversion}%`;
            filtervalue.innerText=`${inversion}%`;
        }else{
            filterslider.max="100";
            filterslider.value=`${grayscale}%`;
            filtervalue.innerText=`${grayscale}%`;
        }
    });
    console.log(option.textContent);  
});

const uptadeValue= () => {
    filtervalue.innerText=`${filterslider.value}%`;
    const selectedfilter=document.querySelector(".filter .active");
    if(selectedfilter.id==="brightnes"){
brightnes=filterslider.value;
    }else if(selectedfilter.id==="saturation"){
        saturation=filterslider.value;
    }else if(selectedfilter.id==="inversion"){
        inversion=filterslider.value;
    }else{
    grayscale=filterslider.value;
    }
    applyfilters();
};

rotateoption.forEach(option => {
option.addEventListener("click" , () => {
if(option.id==="left"){
rotate-=90;
}else if(option.id==="right"){
    rotate+=90;
}else if(option.id==="horizontal"){
    fliphorizontal=fliphorizontal=== 1 ? -1 : 1;
}else{
    flipvertical=flipvertical=== 1 ? -1 : 1;
}
applyfilters();
});
});

const resetvalue= () =>{
    brightnes=100 ,saturation=100,inversion=0,grayscale=0;
    rotate=0,fliphorizontal=1,flipvertical=1;
    filteroptions[0].click();
    applyfilters();
}

const savefilter= () => {
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width=previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;

    ctx.filter=`brightness(${brightnes}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2,canvas.height / 2);
    if(rotate !==0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliphorizontal ,flipvertical);
    ctx.drawImage(previewImg, -canvas.width / 2 , -canvas.height / 2, canvas.width , canvas.height);
    const link=document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();
}


savefilterbtn.addEventListener("click" , savefilter);
resetfilterbtn.addEventListener("click", resetvalue);
fileinput.addEventListener("change", loadimage);
filterslider.addEventListener("input" , uptadeValue);
choseimagebtn.addEventListener("click", () => fileinput.click());


