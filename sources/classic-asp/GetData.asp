<html>
	<head>
		<title>Get data from Service - CVF</title>
	</head>
	<body>
	
		<!-- #include file = "hex_md5_js.asp" -->
		<%
			Function LuhnGenerate(strNumber)
				Set RegEx = New RegExp
				RegEx.Global = True
				RegEx.Pattern = "[\D\s]+"
				strNumber = RegEx.Replace(strNumber, "")
				Set RegEx = Nothing
			 
				intLength  = Len(strNumber)
				boolTester = False
			 
				For i = 1 To intLength
					intDigit = CInt(Mid(strNumber, i, 1))
					
					If boolTester Then
						intDigit = intDigit * 2
						
						If intDigit > 9 Then
							intDigit = intDigit - 9
						End If
					End If
					
					intSum = intSum + intDigit
					boolTester = Not boolTester
				Next
				
				LuhnGenerate = ((intSum * 9) Mod 10)
			End Function
			
			Function LuhnCheck(strNumber)
				intSum = LuhnGenerate(strNumber)
				LuhnCheck = (intSum = 0)
			End Function
			
			Function Lpad(MyValue)
				IF Len(MyValue) = 1 THEN 
					Lpad = "0" & MyValue
				ELSE	
					Lpad = MyValue
				END IF
			End Function
			
			Function GetDateNowFormatted()
				tyear=year(date)
				tmonth=month(date)
				
				if tmonth <10 then tmonth = "0" & tmonth
				tday=day(date)
				if tday<10 then tday = "0" & tday
				thour = hour(time)
				if thour < 10 then thour = "0" & thour
				tmin = minute(time)
				if tmin < 10 then tmin = "0" & tmin
				tsec = second(time)
				if tsec < 10 then tsec = "0" & tsec
				tdate = Right(tyear,3)	&_ 
						Left(tyear, 3)	&_
						Lpad(tmonth)	&_
						Lpad(tsec)		&_
						Lpad(tday)		&_
						Lpad(tmin)		&_
						Lpad(thour)		&_
						randomNumber()	&_
						randomNumber()	
				
				GetDateNowFormatted = (tdate)
			End Function
			
		    Function randomNumber
				Dim MyNewRandomNum
				Randomize
				MyNewRandomNum = Round(Rnd * 8)+1 
				randomNumber = MyNewRandomNum
			End Function
			
			
		%>
		
		<%
			param 	 		= Request("param")
			newParam 		= param & LuhnGenerate(param)
			
			newGen			= GetDateNowFormatted()
			timeStampLhun 	= newGen & LuhnGenerate(newGen)
			
			Response.Write("Seu parametro é: " & param)
			Response.Write("<br/>" & "<br/>")
			
			Response.Write("Luhn Digit: " & LuhnGenerate(param))
			Response.Write("<br/>" & "<br/>")
			
			Response.Write("Param with Digit: " & newParam)
			Response.Write("<br/>" & "<br/>")
			
			Response.Write("Luhn is Valid:" & LuhnCheck(newParam))
			Response.Write("<br/>" & "<br/>")
			
			Response.Write(newGen)
			Response.Write("<br/>" & "<br/>")
			
			Response.Write("Luhn Digit for timeStamp: " & timeStampLhun)
			Response.Write("<br/>" & "<br/>")	
			
			Response.Write("Luhn is Valid for TimeStamp: " & LuhnCheck(timeStampLhun))
			Response.Write("<br/>" & "<br/>")	
			Response.Write("<br/>" & "<br/>")	
			Response.Write("<br/>" & "<br/>")	
			Response.Write("<br/>" & "<br/>")
						
			'Dim teste = MD5("teste")
			'Response.Write("MD5:" & teste)
						
			Dim oXMLHTTP
			Dim strStatusTest
			Set oXMLHTTP = CreateObject("MSXML2.XMLHTTP.3.0")
			
			
			Dim strPassWord, strHash
			strPassWord = "abc"
			strHash = hex_md5(strPassWord)
						
			strPassWord = "abc"
			strHash = hex_md5(strPassWord)
			
			Response.Write("<p><b>strPassWord:</b> " & strPassWord & "</p>")
			Response.Write("<p><b>strHash:</b> " & strHash & "</p>")
			
			T01 = newGen & LuhnGenerate(GetDateNowFormatted()) & "_MagicWordsKeepsSecurity?"	
			Response.Write("Teste01: " & T01)
			Response.Write(" MD5: " & hex_md5(T01))
			Response.Write("<br  />")
			
			T02 = newGen & LuhnGenerate(GetDateNowFormatted()) & "_MagicWordsKeepsSecurity?"	
			Response.Write("Teste02: " & T02)
			Response.Write(" MD5: " & hex_md5(T02))
			Response.Write("<br  />")
			
			T03 = newGen & LuhnGenerate(GetDateNowFormatted())  & "_MagicWordsKeepsSecurity?"
			Response.Write("Teste03: " & T03)
			Response.Write(" MD5: " & hex_md5(T03))
			Response.Write("<br  />")
			
			T04 = newGen & LuhnGenerate(GetDateNowFormatted())	 & "_MagicWordsKeepsSecurity?"
			Response.Write("Teste04: " & T04)
			Response.Write(" MD5: " & hex_md5(T04))
			Response.Write("<br  />")
			
			T05 = newGen & LuhnGenerate(GetDateNowFormatted())	 & "_MagicWordsKeepsSecurity?"
			Response.Write("Teste05: " & T05)
			Response.Write(" MD5: " & hex_md5(T05))
			Response.Write("<br  />")
			
			T06 = newGen & LuhnGenerate(GetDateNowFormatted())	 & "_MagicWordsKeepsSecurity?"
			Response.Write("Teste06: " & T06)
			Response.Write(" MD5: " & hex_md5(T06))
			Response.Write("<br  />")
			
						
			'oXMLHTTP.Open "GET", "http://subdomain.portalcvf.com/Service/Uf?format=json&token=" & timeStampLhun, False
			'oXMLHTTP.Send
			
			'If oXMLHTTP.Status = 200 Then
			'	Response.Write(oXMLHTTP.responseText)
			'End If
		%>
	</body>
</html>