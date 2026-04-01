using ConsoleMailTrap;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Runtime;
using System.Text;

Console.InputEncoding = Encoding.UTF8;
Console.OutputEncoding = Encoding.UTF8;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

var smtp = config.GetSection("SMTP").Get<SmtpSettings>(options =>
    options.BindNonPublicProperties = false);

string to = "novakvova@gmail.com";
string subject = "Треба іти гуляти і шукати пригод."; 
string body = "Давайте підемо гуляти. <b><i>Сало - це дуже смачно</i></b> "; 

var message = new MimeMessage();

message.From.Add(new MailboxAddress(smtp.FromName, smtp.Username));
message.To.Add(MailboxAddress.Parse(to));
message.Subject = subject;
message.Body = new TextPart("html") { Text = body };

using var client = new SmtpClient();
await client.ConnectAsync(smtp.Host, smtp.Port, SecureSocketOptions.StartTls);
await client.AuthenticateAsync(smtp.Username, smtp.Password);
await client.SendAsync(message);
await client.DisconnectAsync(true);

//Console.WriteLine($"Host: {smtp.Host}");
//Console.WriteLine($"Port: {smtp.Port}");
//Console.WriteLine($"User: {smtp.Username}");
