import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Image, Video, Loader2, GripVertical } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  media_url: string;
  media_type: string;
  is_active: boolean;
  sort_order: number | null;
  created_at: string;
}

const GalleryAdmin = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    media_url: '',
    media_type: 'image',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

    const { error: uploadError } = await supabase.storage
      .from('gallery-media')
      .upload(fileName, file);

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
    } else {
      const { data } = supabase.storage.from('gallery-media').getPublicUrl(fileName);
      setFormData({ ...formData, media_url: data.publicUrl, media_type: mediaType });
      toast({ title: 'Media uploaded successfully' });
    }
    setUploading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      media_url: '',
      media_type: 'image',
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category || '',
      media_url: item.media_url,
      media_type: item.media_type,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.media_url) {
      toast({ title: 'Please upload a file', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const itemData = {
      title: formData.title,
      description: formData.description || null,
      category: formData.category || null,
      media_url: formData.media_url,
      media_type: formData.media_type,
    };

    let error;
    if (editingItem) {
      const result = await supabase
        .from('gallery_media')
        .update(itemData)
        .eq('id', editingItem.id);
      error = result.error;
    } else {
      const result = await supabase.from('gallery_media').insert(itemData);
      error = result.error;
    }

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: editingItem ? 'Item updated' : 'Item added' });
      fetchItems();
      setDialogOpen(false);
      resetForm();
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase.from('gallery_media').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Item deleted' });
      fetchItems();
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    const { error } = await supabase
      .from('gallery_media')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchItems();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-foreground">Manage Gallery</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="gold">
              <Plus className="mr-2 h-4 w-4" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Media' : 'Add New Media'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Bridal, Hair, Makeup"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Image or Video *</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.media_url && (
                  <div className="mt-2">
                    {formData.media_type === 'video' ? (
                      <video src={formData.media_url} className="h-32 w-auto rounded-lg" controls />
                    ) : (
                      <img src={formData.media_url} alt="Preview" className="h-32 w-auto object-cover rounded-lg" />
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" disabled={saving || !formData.media_url}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingItem ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-16 bg-card rounded-xl border border-border">
            <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No gallery items yet. Add your first photo or video!</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`relative group rounded-lg overflow-hidden border border-border ${
                !item.is_active ? 'opacity-50' : ''
              }`}
            >
              <div className="aspect-square">
                {item.media_type === 'video' ? (
                  <video src={item.media_url} className="w-full h-full object-cover" />
                ) : (
                  <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                {item.category && (
                  <p className="text-white/70 text-xs">{item.category}</p>
                )}
              </div>

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => openEditDialog(item)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => toggleActive(item)}>
                  {item.is_active ? '👁' : '👁‍🗨'}
                </Button>
                <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteItem(item.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="absolute top-2 left-2">
                {item.media_type === 'video' ? (
                  <Video className="h-5 w-5 text-white drop-shadow-lg" />
                ) : (
                  <Image className="h-5 w-5 text-white drop-shadow-lg" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;
