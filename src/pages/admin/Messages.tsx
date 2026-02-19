import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Check, Mail, MailOpen, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'read' })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    } else {
      fetchMessages();
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const { error } = await supabase.from('contact_messages').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Message deleted',
      });
      setSelectedMessage(null);
      fetchMessages();
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-8">Messages</h1>

      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card rounded-xl border border-border"
        >
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No messages yet</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => handleSelectMessage(message)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-muted/50' : ''
                  } ${message.status === 'unread' ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        message.status === 'unread'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.status === 'unread' ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`font-medium truncate ${
                            message.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {message.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(message.created_at), 'MMM dd')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.subject || 'No subject'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            {selectedMessage ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-foreground">
                    {selectedMessage.subject || 'No subject'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="text-foreground">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-foreground">
                      {format(new Date(selectedMessage.created_at), 'MMMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-12">
                <div>
                  <MailOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a message to view</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Messages;
