 if(/iPhone|iPad|iPod/i.test(navigator.userAgent))
{

	alert("IOS");
}else {
  window.location.href = "/serverDown.html";
}
