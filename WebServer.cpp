#include "WebServer.h"
#include "WebRestHandler.h"

#define DOCUMENT_ROOT "./sdrweb/"
#define PORT "8081"
#define EXAMPLE_URI "/example"
#define EXIT_URI "/exit"

WebRestHandler wsjtx_messages;
WebRestHandlerVfo frequencyvfo1;
WebRestHandlerSelectMessage SelectMessage;
WebRestHandlerQso qso_messages;
WebRestHandlerCq cq_messages;
WebRestHandlerWsjtxFrq wsjtx_frequencies;
WebRestHandlerButtonMessage buttonMessage;

WebServer::WebServer()
{
	mg_init_library(0);
	options.push_back("document_root");
	options.push_back(DOCUMENT_ROOT);
	options.push_back("listening_ports");
	options.push_back(PORT);
}

WebServer::~WebServer()
{
	mg_exit_library();
}

void WebServer::StartServer()
{
	Server = std::make_unique<CivetServer>(options);
	AddHandler("/api/wsjtxmessages", wsjtx_messages);
	AddHandler("/api/frequencyvfo1", frequencyvfo1);
	AddHandler("/api/selectmessage", SelectMessage);
	AddHandler("/api/qsomessages", qso_messages);
	AddHandler("/api/cqmessages", cq_messages);
	AddHandler("/api/wsjtxfrequencies", wsjtx_frequencies);
	AddHandler("/api/buttonmessage", buttonMessage);	
}

void WebServer::AddHandler(const std::string &uri, CivetHandler& handler)
{
	Server->addHandler(uri, handler);
}