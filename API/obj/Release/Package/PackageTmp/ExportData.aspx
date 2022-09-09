<%@ Page Language="C#" Async="true" AutoEventWireup="true" CodeBehind="ExportData.aspx.cs" Inherits="API.ExportData" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Mahidol University Student, Academic and International Services ( MUSAIS )</title>
    <link href="../OnlineApplication/Image/MUIcon.png" rel="shortcut icon" type="image/png" />
    <script type="text/javascript">
        function doHideProgress(seconds) {
            setTimeout(function () {
                document.getElementById("<%= BtnExport.ClientID %>").removeAttribute("disabled");
                document.getElementById("<%= BtnDownload.ClientID %>").removeAttribute("disabled");
                document.getElementById("<%= LblExport.ClientID %>").style.display = "none";
            }, seconds * 1000);
        }

        function doShowProgress(seconds) {
            setTimeout(function () {
                document.getElementById("<%= BtnExport.ClientID %>").setAttribute("disabled", "disabled");
                document.getElementById("<%= BtnDownload.ClientID %>").setAttribute("disabled", "disabled");
                document.getElementById("<%= LblExport.ClientID %>").style.display = "block";
                document.getElementById("<%= LblMessage.ClientID %>").style.display = "none";
            }, seconds * 1000);
        }
    </script>
</head>
<body>
<form
    runat="server"
    method="get"
    onsubmit="">
    <asp:Button
        runat="server"
        ID="BtnExport"
        Text="Start Export Data"
        Width="200"
        OnClick="DoExport"
        OnClientClick="doShowProgress(0)"
    />
    <div style="margin-top:10px;">
        <asp:Button
            runat="server"
            ID="BtnDownload"
            Text="Download File"
            Width="200"
            OnClick="DoDownload"
        />
    </div>
    <div
        style="
            width:200px;
            text-align:center;
            margin-top:10px;
        ">
        <asp:Label
            runat="server"
            ID="LblExport"
            Text="Exporting..."
        />
        <asp:Label
            runat="server"
            ID="LblMessage"
            Text="Please export the data first."
        />
    </div>
</form>
</body>
</html>